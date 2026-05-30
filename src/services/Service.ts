import type {ParamType} from "../types/ParamType.ts";

export class Service<T> {
    apiUrl: string;
    ressource: string;

    constructor(
        ressource: string,
        params: ParamType | null = null
    ) {
        this.apiUrl = `https://restcountries.com/v3.1/${ressource}`;
        this.ressource = ressource;
        if (params) this.setApiUrlParams(params);
    }

    setApiUrlParams(
        params: ParamType
    ) {
        const paramsArray = Object.entries(params);

        const queryParams = paramsArray.map(([key, value]) => {
            return `${key}=${value.join(',')}`;
        })

        if (queryParams.length > 0) {
            this.apiUrl = this.apiUrl + `?${queryParams.join('&')}`;
        }
    }

    async getResource(): Promise<T[] | undefined>{
        try {
            const response = await fetch(this.apiUrl, {
                method: 'GET',
            });
            if (!response.ok) {
                return await response.json();
            }
            throw new Error(response.statusText);
        } catch (error) {
            console.error(`Erreur survenue lors de la récupération de la ressource (${this.ressource}) : ${error}`);
        }
    }
}