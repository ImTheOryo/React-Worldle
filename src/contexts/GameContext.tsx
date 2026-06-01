import {createContext, useContext, useEffect, useState} from "react";
import type {GameContextType} from "../types/context/GameContextType.ts";
import type {GenericProviderProps} from "../types/context/GenericProviderProps.ts";
import type {Country} from "../types/CountryType.ts";
import {useCountry} from "./CountryContext.tsx";

const GameContext = createContext<GameContextType | null>(null)

export function GameContextProvider({ children }: GenericProviderProps) {
    const [loading, setLoading] = useState<boolean>(false)
    const [isWin, setIsWin] = useState<boolean>(false)
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null)
    const [date, setDate] = useState<Date>(new Date())
    const {countries} = useCountry()

    useEffect(() => {
       const selectCountry = () => {
           const rand = Math.floor(Math.random() * (countries.length + 1))
           setSelectedCountry(countries[rand])
       }

       selectCountry()
    },[countries])

    return (
        <GameContext.Provider
            value={{
                loading, isWin, selectedCountry, date
            }}
        >
            {children}
        </GameContext.Provider>
    )
}

export function useGame() {
    const context = useContext(GameContext)
    if (!context) throw new Error('UseGame doit avoir un provider')
    return context
}