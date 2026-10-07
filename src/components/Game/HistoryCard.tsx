import type { Country } from "../../types/CountryType.ts";
import { useGame } from "../../contexts/GameContext.tsx";
import { buildGuessCells } from "../../utils/guessCells.ts";
import { frenchName } from "../../utils/utils.ts";

interface HistoryCardProps {
    country: Country;
}

// Carte d'un essai (mobile et tablette) : remplace la ligne de tableau sous 1024 px
export function HistoryCard({ country }: HistoryCardProps) {
    const { selectedCountry } = useGame();

    if (!selectedCountry) return null;

    const { nameCls, cells } = buildGuessCells(country, selectedCountry);

    return (
        <li className="bg-white rounded-xl border border-slate-200 shadow-sm p-2 space-y-2">
            <div className={`flex items-center gap-3 rounded-lg border-2 px-3 py-2.5 font-bold shadow-sm ${nameCls}`}>
                <img
                    className="fit-picture w-8 h-auto shrink-0 shadow-sm"
                    src={country.flag.url_png}
                    alt=""
                    aria-hidden="true"
                />
                <span className="text-base">{frenchName(country)}</span>
            </div>

            <dl className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {cells.map((cell) => (
                    <div
                        key={cell.label}
                        className={`rounded-lg border-2 px-2 py-2 text-center font-bold shadow-sm transition-colors duration-700 ${cell.cls}`}
                    >
                        <dt className="text-[10px] uppercase tracking-wider opacity-80">{cell.label}</dt>
                        <dd className="mt-0.5 text-sm break-words">{cell.value}</dd>
                    </div>
                ))}
            </dl>
        </li>
    );
}
