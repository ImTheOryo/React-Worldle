interface NativeName {
    common: string;
    official: string;
}

interface Currency {
    name: string;
    symbol: string;
}

export interface Country {
    flag: {
        url_png: string;
        url_svg: string;
        description: string
    },
    names: {
        common: string;
        official: string;
        translations:{
            [languageCode: string]: NativeName
        }
    },
    currencies: {
        [currencyCode: string]: Currency;
    },
    languages: {
        [languageCode: string]: string;
    },
    classification?: {
        sovereign?: boolean;
        un_member?: boolean;
        dependency?: boolean;
    },
    region: string,
    subregion: string,
    coordinates: Record<string, number>,
    uuid?: string,
    codes?: {
        alpha_2?: string;
        alpha_3?: string;
        ccn3?: string;
    }
}