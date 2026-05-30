import {createContext, useContext, useEffect, useMemo, useState} from "react";
import type {CountryContextType} from "../types/context/CountryContextType.ts";
import type {GenericProviderProps} from "../types/context/GenericProviderProps.ts";
import type {Country} from "../types/CountryType.ts";
import {CountryService} from "../services/CoutryService.ts";

const CountryContext = createContext<CountryContextType | null>(null);

const cleanString = (str: string) => {
    return str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
};

export function CountryContextProvider({ children }: GenericProviderProps){
    const [countries, setCountries] = useState<Country[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);

    const service: CountryService = useMemo(() => new CountryService(), []);

    const search = (
        query: string = '',
        excludedCountries: Country[] = []
    ) => {
        const result: Country[] = countries.filter(
            (country: Country) => {
                const isExcluded = excludedCountries.some((excluded: Country) => {
                    return excluded.name.common === country.name.common;
                })
                return cleanString(country.name.common).includes(cleanString(query)) && !isExcluded
            }
        );

        setFilteredCountries(result);
    };

    useEffect(() => {
        const fetchCountries = async (): Promise<void> => {
            setLoading(true);
            const data = await service.getResource();
            setCountries(data ?? []);
            setLoading(false);
        };
        fetchCountries().then()
    }, [service]);

    return (
        <CountryContext.Provider value={{countries, search, filteredCountries, loading}}>
            {children}
        </CountryContext.Provider>
    )
}

export function useCountry() {
    const context = useContext(CountryContext);
    if (!context) throw new Error('useCountry doit être dans un CountryProvider');
    return context;
}