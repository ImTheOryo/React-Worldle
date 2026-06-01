import {createContext, useContext, useEffect, useMemo, useState} from "react";
import type {GameContextType} from "../types/context/GameContextType.ts";
import type {GenericProviderProps} from "../types/context/GenericProviderProps.ts";
import type {Country} from "../types/CountryType.ts";
import {useCountry} from "./CountryContext.tsx";
import {shuffleArrayWithSeed} from "../utils/utils.ts";

const GameContext = createContext<GameContextType | null>(null);

export function GameContextProvider({ children }: GenericProviderProps) {
    const [loading, setLoading] = useState<boolean>(false);
    const [isWin, setIsWin] = useState<boolean>(false);
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
    const [date, setDate] = useState<Date>(new Date());
    const MASTER_SEED = 987654321; //TODO Changer la MASTER_SEED plus tard

    const { countries } = useCountry();

    const shuffleCountries: Country[] = useMemo(() => {
        return shuffleArrayWithSeed(countries, MASTER_SEED);
    }, [countries]);

    useEffect(() => {
        const selectCountry = (date: Date) => {
            if (shuffleCountries.length === 0) return;

            const START_DATE = new Date('2024-01-01');
            const diffTime = Math.abs(date.getTime() - START_DATE.getTime());
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

            const countryIndex = diffDays % shuffleCountries.length;
            setSelectedCountry(shuffleCountries[countryIndex]);
        };
        selectCountry(date)
    }, [date, shuffleCountries]);

    return (
        <GameContext.Provider
            value={{
                loading, isWin, date, setDate, setIsWin, selectedCountry,
            }}
        >
            {children}
        </GameContext.Provider>
    )
}

export function useGame() {
    const context = useContext(GameContext);
    if (!context) throw new Error('useGame doit être dans un GameProvider');
    return context;
}