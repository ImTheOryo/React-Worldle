import type {Country} from "../CountryType.ts";

export interface GameContextType {

    loading: boolean;
    isWin: boolean;
    selectedCountry: Country | null;
    date: Date;

}