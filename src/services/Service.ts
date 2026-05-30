import type {ParamType} from "../types/ParamType.ts";

export class Service<T> {
    private readonly apiUrl: string;
    private  readonly ressource: string;
    private params: string  = '';

    constructor(
        ressource: string,
        params: ParamType | null = null
    ) {
        this.apiUrl = `https://restcountries.com/v3.1/${ressource}`;
        this.ressource = ressource;
        if (params) this.setApiUrlParams(params);
    }

    private setApiUrlParams(
        params: ParamType
    ) {
        const paramsArray = Object.entries(params);

        const queryParams = paramsArray.map(([key, value]) => {
            return `${key}=${value.join(',')}`;
        })

        if (queryParams.length > 0) {
            this.params = `?${queryParams.join('&')}`;
        }
    }

    private setFormattedUrl(
        search: string = ''
    ): string {
        let path: string = this.apiUrl;
        if (search.trim().length > 0) {
            path += `/${search}`;
        }
        const url = new URL(path);

        return url.toString() + this.params;
    }

    public async getResource(
        search: string = ''
    ): Promise<T[] | undefined>{
        const url: string = this.setFormattedUrl(search)
        try {
            const response = await fetch(url, {
                method: 'GET',
            });
            if (response.ok) {
                return await response.json();
            }
            throw new Error(response.statusText);
        } catch (error) {
            console.error(`Erreur survenue lors de la récupération de la ressource (${this.ressource}) : ${error}`);
        }
    }

}