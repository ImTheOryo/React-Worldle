import {createContext, useContext, useEffect, useMemo, useState} from "react";
import type {CountryContextType} from "../types/context/CountryContextType.ts";
import type {GenericProviderProps} from "../types/context/GenericProviderProps.ts";
import type {Country} from "../types/CountryType.ts";
import {CountryService} from "../services/CoutryService.ts";

const CountryContext = createContext<CountryContextType | null>(null);


export function CountryContextProvider({ children }: GenericProviderProps){
    const [countries, setCountries] = useState<Country[]>([]);
    const [loading, setLoading] = useState<boolean>(false);


    const service: CountryService = useMemo(() => new CountryService(), []);

    useEffect(() => {
        const fetchCountries = async (): Promise<void> => {
            setLoading(true);
            const data = await service.getAllCountries();
            setCountries(data ?? []);
            setLoading(false);
        };
        fetchCountries().then()
    }, [service]);

    return (
        <CountryContext.Provider value={{countries, loading}}>
            {children}
        </CountryContext.Provider>
    )
}

export function useCountry() {
    const context = useContext(CountryContext);
    if (!context) throw new Error('useCountry doit Ãªtre dans un CountryProvider');
    return context;
}