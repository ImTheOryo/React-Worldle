import type {Country} from "../CountryType.ts";

export interface HistoryContextType {
    guestedCountries: Country[];
    pushGuestedCountries: (query: Country) => void;
}