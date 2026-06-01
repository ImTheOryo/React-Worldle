import {createContext, useContext, useState} from "react";
import type {HistoryContextType} from "../types/context/HistoryContextType.ts";
import type {GenericProviderProps} from "../types/context/GenericProviderProps.ts";
import type {Country} from "../types/CountryType.ts";
import {useGame} from "./GameContext.tsx";

const HistoryContext = createContext<HistoryContextType | null>(null)

export function HistoryContextProvider({children} : GenericProviderProps) {
    const [loading, setLoading] = useState<boolean>(false)
    const [guestedCountries, setGuestedCountries] = useState<Country[]>([])
    const {date} = useGame()

    const addCountryToHistory = (country: Country) => {
        const newGuestedCountries: Country[] = [country, ...guestedCountries]
        setGuestedCountries(newGuestedCountries)
        console.log(newGuestedCountries)
    }


    return(
        <HistoryContext.Provider
            value={{
                guestedCountries, addCountryToHistory
            }}
        >
            {children}
        </HistoryContext.Provider>
    )
}


export function useHistory() {
    const context = useContext(HistoryContext)
    if(!context) throw new Error("UseHistory doit avoir un context")
    return context
}