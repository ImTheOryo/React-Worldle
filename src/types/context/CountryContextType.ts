import type {Country} from "../CountryType.ts";

export interface CountryContextType {
    countries: Country[];
    loading: boolean;
}