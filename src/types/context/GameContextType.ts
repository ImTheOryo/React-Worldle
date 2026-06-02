import type {Country} from "../CountryType.ts";

export interface GameContextType {
    isWin: boolean;
    selectedCountry: Country | null;
    date: Date;
    setDate: (query: Date) => void;
    setIsWin: (isWin: boolean) => void;
    START_DATE: Date;
}