import type {Country} from "../CountryType.ts";

export interface GameContextType {
    loading: boolean;
    isWin: boolean;
    selectedCountry: Country | null;
    date: Date;
    setDate: (query: Date) => void;
    setIsWin: (isWin: boolean) => void;
    START_DATE: Date;
}