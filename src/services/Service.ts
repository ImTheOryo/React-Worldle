import type {ParamType} from "../types/ParamType.ts";

export class Service<T> {
    private readonly apiUrl: string;
    private params: string  = '';
    private readonly API_KEY = import.meta.env.VITE_API_KEY;

    constructor(
        params: ParamType | null = null
    ) {
        this.apiUrl = `https://api.restcountries.com/countries/v5`;
        if (params) this.setApiUrlParams(params);
    }

    private setApiUrlParams(
        params: ParamType
    ) {
        const paramsArray = Object.entries(params);

        const queryParams = paramsArray.map(([key, value]) => {
            return `${key}=${value.join(',')}`;
        })

        if (queryParams.length > 0 && this.params === '') {
            this.params = `?${queryParams.join('&')}`;
        } else {
            this.params += `&${queryParams.join('&')}`;
        }
    }

    private buildQuery(extra: ParamType | null): string {
        const merged = new URLSearchParams(this.params.replace(/^\?/, ''));
        if (extra) {
            Object.entries(extra).forEach(([key, value]) => merged.set(key, value.join(',')));
        }
        const query = merged.toString();
        return query ? `?${query}` : '';
    }

    public async getResource(
        params: ParamType | null = null,
        search: string = ''
    ): Promise<T[] | undefined> {
        let path: string = this.apiUrl;
        if (search.trim().length > 0) path += `/${search}`;
        const url = new URL(path).toString() + this.buildQuery(params);
        try {
            const response = await fetch(url, {
                headers: { "Authorization": `Bearer ${this.API_KEY}` },
                method: 'GET',
            });
            const json = await response.json();
            if (!response.ok || json.errors) {
                throw new Error(json.errors?.[0]?.message ?? response.statusText);
            }
            return json.data.objects as T[];
        } catch (error) {
            console.error(`Erreur lors de la récupération de la ressource (${url}) : ${error}`);
        }
    }

}