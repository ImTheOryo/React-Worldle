import {useCountry} from "../contexts/CountryContext.tsx";
import {useHistory} from "../contexts/HistoryContext.tsx";
import type {Country} from "../types/CountryType.ts";
import {cleanString} from "../utils/utils.ts";
import {useCallback} from "react";

export function useSearch(){
    const { countries } = useCountry()
    const { guestedCountries } = useHistory()

    const search: ((query: string)=>Country[]) = useCallback((query: string) => {

        const excludedNames = new Set(guestedCountries.map(c => c.translations.fra.common));

        return countries
            .filter((country: Country) => {
                if (excludedNames.has(country.translations.fra.common)) {
                    return false;
                }

                if (!query || query.trim() === '') {
                    return true;
                }

                return cleanString(country.translations.fra.common).includes(cleanString(query));
            })
            .sort((a: Country,b: Country) => a.translations.fra.common.localeCompare(b.translations.fra.common));
    }, [countries, guestedCountries]);

    return { search };
}