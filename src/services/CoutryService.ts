import {Service} from "./Service.ts";
import type {Country} from "../types/CountryType.ts";
import type {ParamType} from "../types/ParamType.ts";

export class CountryService extends Service<Country>{
    constructor() {
        const params: ParamType = {
            "response_fields" : [
                "names",
                "languages",
                "currencies",
                "classification.sovereign",
                "region",
                "subregion",
                "flag",
                "coordinates",
                "uuid",
                "codes"
            ],
            "limit" : ["100"]
        }
        super(params);
    }

    async getAllCountries(): Promise<Country[] | undefined> {
        const PAGE_SIZE = 100;
        const countries: Country[] = [];

        for (let offset = 0; ; offset += PAGE_SIZE) {
            const page = await this.getResource({
                "offset" : [`${offset}`]
            });
            if (!page) break;
            countries.push(...page);
            if (page.length < PAGE_SIZE) break;
        }

        return countries;
    }
}