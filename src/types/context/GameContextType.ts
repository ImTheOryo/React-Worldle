import type {Country} from "../CountryType.ts";

export interface GameContextType {
    loading: boolean;
    isWin: boolean;
    selectedCountry: Country | null;
    date: Date;
    setDate: (query: Date) => void;
    checkWinCondition: (query: Country) => boolean;
    guestedCountries: Country[];
    pushGuestedCountries: (query: Country) => void;
}