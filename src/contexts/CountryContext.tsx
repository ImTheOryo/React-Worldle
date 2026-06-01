import {createContext, useCallback, useContext, useEffect, useMemo, useState} from "react";
import type {CountryContextType} from "../types/context/CountryContextType.ts";
import type {GenericProviderProps} from "../types/context/GenericProviderProps.ts";
import type {Country} from "../types/CountryType.ts";
import {CountryService} from "../services/CoutryService.ts";
import {cleanString} from "../utils/utils.ts";

const CountryContext = createContext<CountryContextType | null>(null);


export function CountryContextProvider({ children }: GenericProviderProps){
    const [countries, setCountries] = useState<Country[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [filteredCountries, setFilteredCountries] = useState<Country[]>(countries.sort((a: Country,b: Country) => a.name.common.localeCompare(b.name.common)));

    const service: CountryService = useMemo(() => new CountryService(), []);

    const search = useCallback((
        query: string,
        excludedCountries: Country[] = []
    ) => {
        const excludedNames = new Set(excludedCountries.map(c => c.name.common));

        const result: Country[] = countries.filter((country: Country) => {
            if (excludedNames.has(country.name.common)) {
                return false;
            }

            if (!query || query.trim() === '') {
                return true;
            }

            return cleanString(country.name.common).includes(cleanString(query));
        });

        setFilteredCountries(result);
    }, [countries])

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
        <CountryContext.Provider value={{countries, search, filteredCountries, loading}}>
            {children}
        </CountryContext.Provider>
    )
}

export function useCountry() {
    const context = useContext(CountryContext);
    if (!context) throw new Error('useCountry doit Ãªtre dans un CountryProvider');
    return context;
}