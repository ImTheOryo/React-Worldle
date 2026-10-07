import {getDistanceBetweenTwoPoints} from "calculate-distance-between-coordinates";
import type {Country} from "../../types/CountryType.ts";
import {getGuessColor} from "../../services/GuessColorService.ts";
import {formatCurrencies, formatLanguages, frenchName, isSovereign} from "../../utils/utils.ts";

interface CountryInfoPanelProps {
    country: Country;
    target: Country | null;
    isGuessed: boolean;
    canGuess: boolean;
    onGuess: () => void;
    onClose: () => void;
}

const BASE = "rounded-lg border-2 px-3 py-2 text-center font-bold shadow-sm";
const NEUTRAL = "bg-slate-100 text-slate-700 border-slate-200";

export function CountryInfoPanel({country, target, isGuessed, canGuess, onGuess, onClose}: CountryInfoPanelProps) {
    // Les couleurs ne sont affichées que pour un pays déjà proposé (sinon on spoilerait la réponse)
    const clueTarget: Country | null = isGuessed ? target : null;
    const showClues = clueTarget !== null;

    const color = (property: keyof Country): string =>
        clueTarget ? getGuessColor(country, clueTarget, property) : NEUTRAL;

    const nameColor = clueTarget
        ? (country.names.common === clueTarget.names.common
            ? "bg-green-700 text-white border-green-800"
            : "bg-red-700 text-white border-red-800")
        : NEUTRAL;

    const distance = clueTarget
        ? getDistanceBetweenTwoPoints(
            {lat: country.coordinates.lat, lon: country.coordinates.lng},
            {lat: clueTarget.coordinates.lat, lon: clueTarget.coordinates.lng},
            "km"
        ).toFixed(0)
        : null;

    const cells: { label: string; value: string; cls: string }[] = [
        {label: "Région", value: country.region || "-", cls: color("region")},
        {label: "Sous-région", value: country.subregion || "-", cls: color("subregion")},
        {label: "Monnaie(s)", value: formatCurrencies(country.currencies), cls: color("currencies")},
        {label: "Langue(s)", value: formatLanguages(country.languages), cls: color("languages")},
        {label: "Indépendant", value: isSovereign(country) ? "Oui" : "Non", cls: color("classification")},
        {label: "Distance au pays recherché", value: distance !== null ? `${distance} km` : "?", cls: color("coordinates")},
    ];

    return (
        <aside
            className="mt-4 rounded-xl border border-slate-200 bg-white p-3 sm:p-4 shadow-sm"
            aria-label={`Informations sur ${frenchName(country)}`}
        >
            <div className="flex items-center justify-between gap-2 sm:gap-3 mb-3">
                <div className={`${BASE} flex items-center gap-3 min-w-0 ${nameColor}`}>
                    <img className="w-8 h-auto shrink-0 shadow-sm" src={country.flag.url_png} alt="" aria-hidden="true"/>
                    <span className="text-base sm:text-lg truncate">{frenchName(country)}</span>
                </div>
                <button
                    onClick={onClose}
                    aria-label="Fermer"
                    className="shrink-0 w-10 h-10 flex items-center justify-center text-sm font-semibold text-slate-600 bg-slate-200 hover:bg-slate-300 rounded-full transition-colors"
                >
                    ✕
                </button>
            </div>

            {showClues ? (
                <dl className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {cells.map((cell) => (
                        <div key={cell.label} className={`${BASE} ${cell.cls}`}>
                            <dt className="text-xs uppercase tracking-wider opacity-80">{cell.label}</dt>
                            <dd className="mt-1 text-sm break-words">{cell.value}</dd>
                        </div>
                    ))}
                </dl>
            ) : (
                <div className="flex flex-col items-start gap-3">
                    <p className="text-sm text-slate-500">
                        Ce pays n'a pas encore été proposé : ses indices apparaîtront une fois essayé.
                    </p>
                    {canGuess && (
                        <button
                            onClick={onGuess}
                            className="w-full sm:w-auto min-h-11 px-5 py-2 text-sm font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-full transition-colors"
                        >
                            Proposer ce pays
                        </button>
                    )}
                </div>
            )}
        </aside>
    );
}