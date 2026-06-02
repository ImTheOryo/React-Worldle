import {Service} from "./Service.ts";
import type {Country} from "../types/CountryType.ts";
import type {ParamType} from "../types/ParamType.ts";

export class CountryService extends Service<Country>{
    constructor() {
        const ressource: string = "all"
        const params: ParamType = {
            "fields" : [
                "name",
                "languages",
                "currencies",
                "independent",
                "region",
                "subregion",
                "flags",
                "latlng"
            ]
        }
        super(ressource, params);
    }

    async getAllCountries(): Promise<Country[] | undefined> {
        return this.getResource()
    }
}