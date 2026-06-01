import type {Country} from "../CountryType.ts";

export interface HistoryContextType {
    guestedCountries: Country[];
    addCountryToHistory: (query: Country) => void;

}