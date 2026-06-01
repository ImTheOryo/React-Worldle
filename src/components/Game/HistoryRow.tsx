import type { Country } from "../../types/CountryType.ts";
import { useGame } from "../../contexts/GameContext.tsx";
import { HistoryCell } from "./HistoryCell.tsx";
import { getGuessColor } from "../../services/GuessColorService.ts";

interface HistoryRowProps {
    country: Country;
}

export function HistoryRow({ country }: HistoryRowProps) {
    const { selectedCountry } = useGame();
    const { setIsWin } = useGame()

    if (!selectedCountry) return null;

    const formatCurrencies = (c?: any) => c ? Object.values(c).map((curr: any) => curr.name).join(', ') : '-';
    const formatLanguages = (l?: any) => l ? Object.values(l).join(', ') : '-';
    const formatBool = (b?: boolean) => b ? 'Yes' : 'No';

    const baseCellClass = "border-2 flex items-center justify-center text-center p-2 min-h-25 font-bold shadow-md transition-colors duration-700";

    const nameColor = country.name.common === selectedCountry.name.common
        ? 'bg-green-500 text-white border-green-600'
        : 'bg-red-500 text-white border-red-600';

    return (
        <div className="grid grid-cols-6 gap-3 mb-3">
            {/* 1. Country */}
            <HistoryCell
                value={country.name.common}
                cssClass={`${baseCellClass} ${nameColor}`}
            />

            {/* 2. Region */}
            <HistoryCell
                value={country.region}
                cssClass={`${baseCellClass} ${getGuessColor(country, selectedCountry, 'region')}`}
            />

            {/* 3. Subregion */}
            <HistoryCell
                value={country.subregion}
                cssClass={`${baseCellClass} ${getGuessColor(country, selectedCountry, 'subregion')}`}
            />

            {/* 4. Currencies */}
            <HistoryCell
                value={formatCurrencies(country.currencies)}
                cssClass={`${baseCellClass} ${getGuessColor(country, selectedCountry, 'currencies')}`}
            />

            {/* 5. Languages */}
            <HistoryCell
                value={formatLanguages(country.languages)}
                cssClass={`${baseCellClass} ${getGuessColor(country, selectedCountry, 'languages')}`}
            />

            {/* 6. Is independent */}
            <HistoryCell
                value={formatBool(country.independent)}
                cssClass={`${baseCellClass} ${getGuessColor(country, selectedCountry, 'independent')}`}
            />
        </div>
    );
}