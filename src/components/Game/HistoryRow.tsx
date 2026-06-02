import type { Country } from "../../types/CountryType.ts";
import { useGame } from "../../contexts/GameContext.tsx";
import { getGuessColor } from "../../services/GuessColorService.ts";

interface HistoryRowProps {
    country: Country;
}

export function HistoryRow({ country }: HistoryRowProps) {
    const { selectedCountry } = useGame();

    if (!selectedCountry) return null;

    const formatCurrencies = (c?: any) => c ? Object.values(c).map((curr: any) => curr.name).join(', ') : '-';
    const formatLanguages = (l?: any) => l ? Object.values(l).join(', ') : '-';
    const formatBool = (b?: boolean) => b ? 'Yes' : 'No';

    const baseCellClass = "border-2 align-middle text-center p-2 h-[80px] font-bold shadow-md transition-colors duration-700";

    const nameColor = country.name.common === selectedCountry.name.common
        ? 'bg-green-700 text-white border-green-800'
        : 'bg-red-700 text-white border-red-800'

    return (
        <tr className="group hover:opacity-95 transition-opacity">
            {/* 1. Country */}
            <td className={`${baseCellClass} ${nameColor} rounded-l-xl w-1/6`}>
                <div className="flex justify-center items-center gap-3">
                    <img
                        className="fit-picture w-6 h-auto shrink-0 shadow-sm"
                        src={country.flags.png}
                        alt=""
                        aria-hidden="true"
                    />
                    <span className="line-clamp-3">{country.name.common}</span>
                </div>
            </td>

            {/* 2. Region */}
            <td className={`${baseCellClass} ${getGuessColor(country, selectedCountry, 'region')} w-1/6`}>
                <div className="line-clamp-3">{country.region || '-'}</div>
            </td>

            {/* 3. Subregion */}
            <td className={`${baseCellClass} ${getGuessColor(country, selectedCountry, 'subregion')} w-1/6`}>
                <div className="line-clamp-3">{country.subregion || '-'}</div>
            </td>

            {/* 4. Currencies */}
            <td className={`${baseCellClass} ${getGuessColor(country, selectedCountry, 'currencies')} w-1/6`}>
                <div className="line-clamp-3">{formatCurrencies(country.currencies)}</div>
            </td>

            {/* 5. Languages */}
            <td className={`${baseCellClass} ${getGuessColor(country, selectedCountry, 'languages')} w-1/6`}>
                <div className="line-clamp-3">{formatLanguages(country.languages)}</div>
            </td>

            {/* 6. Is independent */}
            <td className={`${baseCellClass} ${getGuessColor(country, selectedCountry, 'independent')} rounded-r-xl w-1/6`}>
                <div className="line-clamp-3">{formatBool(country.independent)}</div>
            </td>
        </tr>
    );
}