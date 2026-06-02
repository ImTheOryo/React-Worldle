import {useCountry} from "../contexts/CountryContext.tsx";
import {useHistory} from "../contexts/HistoryContext.tsx";
import type {Country} from "../types/CountryType.ts";
import {cleanString} from "../utils/utils.ts";
import {useCallback} from "react";

export function useSearch(){
    const { countries } = useCountry()
    const { guestedCountries } = useHistory()

    const search: ((query: string)=>Country[]) = useCallback((query: string) => {

        const excludedNames = new Set(guestedCountries.map(c => c.name.common));

        return countries
            .filter((country: Country) => {
                if (excludedNames.has(country.name.common)) {
                    return false;
                }

                if (!query || query.trim() === '') {
                    return true;
                }

                return cleanString(country.name.common).includes(cleanString(query));
            })
            .sort((a: Country,b: Country) => a.name.common.localeCompare(b.name.common));
    }, [countries, guestedCountries]);

    return { search };
}