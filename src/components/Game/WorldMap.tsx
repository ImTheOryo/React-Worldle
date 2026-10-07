import {useEffect, useMemo, useRef, useState} from "react";
import type {PointerEvent as ReactPointerEvent} from "react";
import {geoNaturalEarth1, geoPath} from "d3-geo";
import {feature} from "topojson-client";
import type {GeometryCollection, Topology} from "topojson-specification";
import type {FeatureCollection, Geometry} from "geojson";
import world from "world-atlas/countries-110m.json";
import type {Country} from "../../types/CountryType.ts";
import {useCountry} from "../../contexts/CountryContext.tsx";
import {useGame} from "../../contexts/GameContext.tsx";
import {useHistory} from "../../contexts/HistoryContext.tsx";
import {getGuessLevel} from "../../services/GuessColorService.ts";
import {CountryInfoPanel} from "./CountryInfoPanel.tsx";
import {frenchName, numericCode} from "../../utils/utils.ts";
import type {GuessLevel} from "../../services/GuessColorService.ts";

const W = 960;
const H = 500;

// Géométries calculées une seule fois (hors composant)
const topo = world as unknown as Topology;
const collection = feature(topo, topo.objects.countries as GeometryCollection) as FeatureCollection<Geometry, { name: string }>;
const projection = geoNaturalEarth1().fitSize([W, H], {type: "Sphere"});
const toPath = geoPath(projection);
const SHAPES = collection.features
    .filter((f) => String(f.id).padStart(3, "0") !== "010") // sans l'Antarctique
    .map((f) => ({
        code: String(f.id).padStart(3, "0"), // = uuid de REST Countries
        name: f.properties.name,
        d: toPath(f) ?? "",
    }));

// Mêmes teintes que le tableau d'historique (green/orange/red-700)
const FILL: Record<GuessLevel, string> = {exact: "#15803d", partial: "#c2410c", wrong: "#b91c1c"};
const EMPTY = "#cbd5e1";

// Zoom / déplacement : transformation appliquée au groupe SVG (k = échelle, x/y = décalage en unités du viewBox)
type View = { k: number; x: number; y: number };
const MIN_K = 1;
const MAX_K = 8;
const INITIAL_VIEW: View = {k: 1, x: 0, y: 0};

// Empêche de sortir de la carte (le contenu couvre toujours tout le cadre)
const clampView = (v: View): View => ({
    k: v.k,
    x: Math.min(0, Math.max(W * (1 - v.k), v.x)),
    y: Math.min(0, Math.max(H * (1 - v.k), v.y)),
});

// Zoom autour du point (cx, cy), exprimé en coordonnées du viewBox
const zoomAt = (v: View, factor: number, cx: number, cy: number): View => {
    const k = Math.min(MAX_K, Math.max(MIN_K, v.k * factor));
    const ratio = k / v.k;
    return clampView({k, x: cx - (cx - v.x) * ratio, y: cy - (cy - v.y) * ratio});
};

export function WorldMap() {
    const {countries} = useCountry();
    const {guestedCountries, pushGuestedCountries} = useHistory();
    const {selectedCountry, isWin} = useGame();
    const param = "global";
    const [hover, setHover] = useState<string | null>(null);
    const [selectedCode, setSelectedCode] = useState<string | null>(null);
    const [view, setView] = useState<View>(INITIAL_VIEW);

    const svgRef = useRef<SVGSVGElement | null>(null);
    const panelRef = useRef<HTMLDivElement | null>(null);
    const pointers = useRef(new Map<number, { x: number; y: number }>());
    const downPos = useRef<{ x: number; y: number } | null>(null);
    const lastPinch = useRef<number | null>(null);
    const moved = useRef(false); // vrai si le geste était un déplacement (et non un clic)

    // Coordonnées écran -> coordonnées du viewBox
    const toSvgPoint = (clientX: number, clientY: number): [number, number] => {
        const rect = svgRef.current!.getBoundingClientRect();
        return [(clientX - rect.left) * (W / rect.width), (clientY - rect.top) * (H / rect.height)];
    };

    // Ctrl / ⌘ + molette (et pincement du pavé tactile). Écouteur non passif pour pouvoir bloquer le scroll de la page.
    useEffect(() => {
        const svg = svgRef.current;
        if (!svg) return;
        const onWheel = (e: WheelEvent) => {
            if (!e.ctrlKey && !e.metaKey) return;
            e.preventDefault();
            const rect = svg.getBoundingClientRect();
            const cx = (e.clientX - rect.left) * (W / rect.width);
            const cy = (e.clientY - rect.top) * (H / rect.height);
            setView((v) => zoomAt(v, Math.exp(-e.deltaY * 0.01), cx, cy));
        };
        svg.addEventListener("wheel", onWheel, {passive: false});
        return () => svg.removeEventListener("wheel", onWheel);
    }, []);

    // Sur mobile le panneau est sous la carte : on le fait apparaître à l'écran après un tap sur un pays
    useEffect(() => {
        if (selectedCode) panelRef.current?.scrollIntoView({behavior: "smooth", block: "nearest"});
    }, [selectedCode]);

    const zoomFromCenter = (factor: number) => setView((v) => zoomAt(v, factor, W / 2, H / 2));

    const onPointerDown = (e: ReactPointerEvent<SVGSVGElement>) => {
        pointers.current.set(e.pointerId, {x: e.clientX, y: e.clientY});
        downPos.current = {x: e.clientX, y: e.clientY};
        moved.current = false;
        lastPinch.current = null;
    };

    const onPointerMove = (e: ReactPointerEvent<SVGSVGElement>) => {
        const prev = pointers.current.get(e.pointerId);
        if (!prev || !svgRef.current) return;
        const cur = {x: e.clientX, y: e.clientY};
        pointers.current.set(e.pointerId, cur);

        if (downPos.current && Math.hypot(cur.x - downPos.current.x, cur.y - downPos.current.y) > 4) {
            moved.current = true;
        }

        // Pincement à deux doigts
        if (pointers.current.size === 2) {
            const [a, b] = [...pointers.current.values()];
            const dist = Math.hypot(a.x - b.x, a.y - b.y);
            const previous = lastPinch.current;
            if (previous) {
                const [cx, cy] = toSvgPoint((a.x + b.x) / 2, (a.y + b.y) / 2);
                setView((v) => zoomAt(v, dist / previous, cx, cy));
            }
            lastPinch.current = dist;
            moved.current = true;
            return;
        }

        // Déplacement (un seul pointeur)
        if (pointers.current.size === 1 && moved.current) {
            const rect = svgRef.current.getBoundingClientRect();
            const dx = (cur.x - prev.x) * (W / rect.width);
            const dy = (cur.y - prev.y) * (H / rect.height);
            setView((v) => clampView({k: v.k, x: v.x + dx, y: v.y + dy}));
        }
    };

    const onPointerEnd = (e: ReactPointerEvent<SVGSVGElement>) => {
        pointers.current.delete(e.pointerId);
        lastPinch.current = null;
    };

    // Retrouve un pays par son code numérique ISO (ccn3)
    const byCode = useMemo(() => {
        const map = new Map<string, Country>();
        countries.forEach((c) => {
            const code = numericCode(c);
            if (code) map.set(code, c);
        });
        return map;
    }, [countries]);
    const guessed = useMemo(() => new Set(guestedCountries.map((c) => c.names.common)), [guestedCountries]);

    // Trois niveaux : exact (vert), partiel / proche (orange), faux (rouge)
    const levelFor = (country: Country, target: Country): GuessLevel => {
        if (country.names.common === target.names.common) return "exact";
        // Onglet "Pays" : vert si trouvé, sinon orange si < 5000 km, sinon rouge
        return getGuessLevel(country, target, param === "global" ? "coordinates" : param);
    };

    const fillFor = (code: string): string => {
        const country = byCode.get(code);
        if (!country || !selectedCountry || !guessed.has(country.names.common)) return EMPTY;
        return FILL[levelFor(country, selectedCountry)];
    };

    const infoCountry = selectedCode ? byCode.get(selectedCode) ?? null : null;
    const selectedShape = SHAPES.find((s) => s.code === selectedCode);

    const onGuessInfoCountry = () => {
        if (infoCountry && !isWin) pushGuestedCountries(infoCountry);
    };

    return (
        <section className="w-full max-w-5xl bg-white rounded-xl shadow-sm border border-slate-200 p-2 sm:p-4" aria-label="Carte du monde">
            <div className="relative">
                {hover && (
                    <div className="absolute top-2 left-2 px-3 py-1 text-sm font-semibold bg-slate-800/80 text-white rounded-lg pointer-events-none">
                        {hover}
                    </div>
                )}
                <div className="absolute top-2 right-2 z-10 flex flex-col gap-1">
                    <button
                        onClick={() => zoomFromCenter(1.5)}
                        disabled={view.k >= MAX_K}
                        aria-label="Zoomer"
                        title="Zoomer"
                        className="w-10 h-10 sm:w-8 sm:h-8 text-lg sm:text-base rounded-lg bg-white border border-slate-300 text-slate-700 font-bold shadow-sm hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-white"
                    >
                        +
                    </button>
                    <button
                        onClick={() => zoomFromCenter(1 / 1.5)}
                        disabled={view.k <= MIN_K}
                        aria-label="Dézoomer"
                        title="Dézoomer"
                        className="w-10 h-10 sm:w-8 sm:h-8 text-lg sm:text-base rounded-lg bg-white border border-slate-300 text-slate-700 font-bold shadow-sm hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-white"
                    >
                        −
                    </button>
                    <button
                        onClick={() => setView(INITIAL_VIEW)}
                        disabled={view.k === MIN_K}
                        aria-label="Réinitialiser le zoom"
                        title="Réinitialiser le zoom"
                        className="w-10 h-10 sm:w-8 sm:h-8 rounded-lg bg-white border border-slate-300 text-slate-700 text-base sm:text-sm shadow-sm hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-white"
                    >
                        ⟲
                    </button>
                </div>
                <svg
                    ref={svgRef}
                    viewBox={`0 0 ${W} ${H}`}
                    className="w-full h-auto select-none"
                    style={{touchAction: view.k > 1 ? "none" : "pan-y"}}
                    onPointerDown={onPointerDown}
                    onPointerMove={onPointerMove}
                    onPointerUp={onPointerEnd}
                    onPointerCancel={onPointerEnd}
                    onPointerLeave={onPointerEnd}
                >
                    <g transform={`translate(${view.x} ${view.y}) scale(${view.k})`}>
                        {SHAPES.map((s) => (
                            <path
                                key={s.code + s.name}
                                d={s.d}
                                fill={fillFor(s.code)}
                                stroke="#ffffff"
                                strokeWidth={0.5}
                                vectorEffect="non-scaling-stroke"
                                className="cursor-pointer transition-colors duration-500 hover:brightness-110"
                                onMouseEnter={() => setHover(byCode.has(s.code) ? frenchName(byCode.get(s.code)!) : s.name)}
                                onMouseLeave={() => setHover(null)}
                                onClick={() => {
                                    if (moved.current) return; // fin d'un glisser, pas un clic
                                    setSelectedCode(s.code === selectedCode ? null : s.code);
                                }}
                            />
                        ))}
                        {selectedShape && (
                            <path
                                d={selectedShape.d}
                                fill="none"
                                stroke="#0f172a"
                                strokeWidth={1.5}
                                vectorEffect="non-scaling-stroke"
                                className="pointer-events-none"
                            />
                        )}
                    </g>
                </svg>
            </div>

            <ul className="grid grid-cols-2 sm:flex sm:flex-wrap gap-x-4 gap-y-1.5 justify-center mt-3 text-xs sm:text-sm text-slate-600">
                <li><span className="inline-block w-3 h-3 rounded-sm mr-1" style={{background: FILL.exact}}/>Exact</li>
                <li><span className="inline-block w-3 h-3 rounded-sm mr-1" style={{background: FILL.partial}}/>Partiel / proche</li>
                <li><span className="inline-block w-3 h-3 rounded-sm mr-1" style={{background: FILL.wrong}}/>Faux</li>
                <li><span className="inline-block w-3 h-3 rounded-sm mr-1" style={{background: EMPTY}}/>Pas encore essayé</li>
            </ul>
            <p className="mt-2 text-center text-xs text-slate-400">
                <span className="sm:hidden">Pincez ou utilisez +/− pour zoomer. Glissez pour déplacer la carte.</span>
                <span className="hidden sm:inline">Zoom : boutons +/−, Ctrl (⌘) + molette ou pincement. Glissez pour déplacer la carte.</span>
            </p>

            <div ref={panelRef}>
                {infoCountry && (
                    <CountryInfoPanel
                        country={infoCountry}
                        target={selectedCountry}
                        isGuessed={guessed.has(infoCountry.names.common)}
                        canGuess={!isWin}
                        onGuess={onGuessInfoCountry}
                        onClose={() => setSelectedCode(null)}
                    />
                )}
            </div>
        </section>
    );
}