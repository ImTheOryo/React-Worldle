import {createContext, useContext, useEffect, useMemo, useState} from "react";
import type {GameContextType} from "../types/context/GameContextType.ts";
import type {GenericProviderProps} from "../types/context/GenericProviderProps.ts";
import type {Country} from "../types/CountryType.ts";
import {useCountry} from "./CountryContext.tsx";
import {shuffleArrayWithSeed} from "../utils/utils.ts";

const GameContext = createContext<GameContextType | null>(null);

export function GameContextProvider({ children }: GenericProviderProps) {
    const [loading, setLoading] = useState<boolean>(false);
    const [isWin, setIsWin] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
    const [date, setDate] = useState<Date>(new Date());
    const [guestedCountries, setGuestedCountries] = useState<Country[]>([]);
    const MASTER_SEED = 987654321; //TODO Changer la MASTER_SEED plus tard
    const { countries } = useCountry();

    const shuffleCountries: Country[] = useMemo(() => {
        return shuffleArrayWithSeed(countries, MASTER_SEED);
    }, [countries]);

    const pushGuestedCountries = (country: Country) => {
        if (guestedCountries.includes(country)) return
        const newGuestedCountries: Country[] = [country, ...guestedCountries];
        const dateGuesses = `${date.toLocaleDateString('fr-FR')}_guesses`

        setGuestedCountries(newGuestedCountries);
        localStorage.setItem(dateGuesses, JSON.stringify(newGuestedCountries))
    }

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

    useEffect(() => {
        const setGuesses = () => {
            const dateGuesses = `${date.toLocaleDateString('fr-FR')}_guesses`
            const storedData: string | null = localStorage.getItem(dateGuesses)
            if (storedData) {
                const alreadyGuesses: Country[] = JSON.parse(storedData);
                setGuestedCountries(alreadyGuesses);
            }
        }
        setGuesses()
    }, [date]);

    return (
        <GameContext.Provider
            value={{
                loading, isWin, date, setDate, selectedCountry, guestedCountries, pushGuestedCountries
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