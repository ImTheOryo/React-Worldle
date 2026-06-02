import {createContext, useContext, useEffect, useState} from "react";
import type {HistoryContextType} from "../types/context/HistoryContextType.ts";
import type {GenericProviderProps} from "../types/context/GenericProviderProps.ts";
import type {Country} from "../types/CountryType.ts";
import {useGame} from "./GameContext.tsx";

const HistoryContext = createContext<HistoryContextType | null>(null)

export function HistoryContextProvider({ children}: GenericProviderProps) {
    const [guestedCountries, setGuestedCountries] = useState<Country[]>([]);
    const { date, setIsWin, selectedCountry } = useGame();


    const pushGuestedCountries = (country: Country) => {
        if (guestedCountries.includes(country)) return
        const newGuestedCountries: Country[] = [country, ...guestedCountries];
        const dateGuesses = `${date.toLocaleDateString('fr-FR')}_guesses`

        setGuestedCountries(newGuestedCountries);
        localStorage.setItem(dateGuesses, JSON.stringify(newGuestedCountries))

        if (country.name.common === selectedCountry?.name?.common) {
            setIsWin(true)
        }
    }

    useEffect(() => {
        const setGuesses = () => {
            const dateGuesses = `${date.toLocaleDateString('fr-FR')}_guesses`
            const storedData: string | null = localStorage.getItem(dateGuesses)
            if (storedData) {
                const alreadyGuesses: Country[] = JSON.parse(storedData);
                setGuestedCountries(alreadyGuesses);
                if (alreadyGuesses.find(
                    (country: Country) => country.name.common === selectedCountry?.name.common)
                ) {
                    setIsWin(true)
                }
                return
            }
            setGuestedCountries([])
        }
        setGuesses()
    }, [date, selectedCountry]);

    return (
        <HistoryContext.Provider
            value={{
                pushGuestedCountries, guestedCountries
            }}
        >
            {children}
        </HistoryContext.Provider>
    )
}

export function useHistory() {
    const context = useContext(HistoryContext);
    if (!context) throw new Error("useHistory() must be used within the context");
    return context;
}