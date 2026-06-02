
interface NativeName {
    common: string;
    official: string;
}

interface Currency {
    name: string;
    currency: string;
}

export interface Country {
    flags: {
        png: string;
        svg: string;
        alt: string
    },
    name: {
        common: string;
        official: string;
        nativeName: {
            [languageCode: string]: NativeName;
        }
    },
    currencies: {
        [currencyCode: string]: Currency;
    },
    languages: {
        [languageCode: string]: string;
    },
    independent: boolean,
    region: string,
    subregion: string,
    latlng: [number, number],
}