import type { Country } from "../../types/CountryType.ts";
import { useGame } from "../../contexts/GameContext.tsx";
import { buildGuessCells } from "../../utils/guessCells.ts";
import { frenchName } from "../../utils/utils.ts";

interface HistoryRowProps {
    country: Country;
}

// Ligne de tableau (écrans larges). Sur mobile, voir HistoryCard.
export function HistoryRow({ country }: HistoryRowProps) {
    const { selectedCountry } = useGame();

    if (!selectedCountry) return null;

    const { nameCls, cells } = buildGuessCells(country, selectedCountry);

    const baseCellClass = "border-2 align-middle text-center p-2 h-[80px] font-bold shadow-md transition-colors duration-700";

    return (
        <tr className="group hover:opacity-95 transition-opacity">
            {/* 1. Pays */}
            <td className={`${baseCellClass} ${nameCls} rounded-l-xl w-1/7`}>
                <div className="flex justify-center items-center gap-3">
                    <img
                        className="fit-picture w-6 h-auto shrink-0 shadow-sm"
                        src={country.flag.url_png}
                        alt=""
                        aria-hidden="true"
                    />
                    <span className="line-clamp-3">{frenchName(country)}</span>
                </div>
            </td>

            {/* 2 à 7. Région, sous-région, monnaies, langues, indépendance, distance */}
            {cells.map((cell, index) => (
                <td
                    key={cell.label}
                    className={`${baseCellClass} ${cell.cls} w-1/7 ${index === cells.length - 1 ? "rounded-r-xl" : ""}`}
                >
                    <div className="line-clamp-3">{cell.value}</div>
                </td>
            ))}
        </tr>
    );
}
