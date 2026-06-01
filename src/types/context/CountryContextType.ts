import type {Country} from "../CountryType.ts";

export interface CountryContextType {
    countries: Country[];
    filteredCountries: Country[];
    loading: boolean;
    search: (query:string, excludedCountries: Country[]) => void;
}