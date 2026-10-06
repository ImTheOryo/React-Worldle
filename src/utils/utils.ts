import type {Country} from "../types/CountryType.ts";

export function cleanString (str: string): string {
    return str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

export function mulberry32(seed: number) {
    return function (): number {
        let t = seed += 0x6D2B79F5;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    }
}

export function shuffleArrayWithSeed<T> (array: T[], seed: number) {
    const random = mulberry32(seed);
    const shuffled = [...array];

    for (let i = shuffled.length - 1; i >= 0; i--) {
        const j = Math.floor(random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
}

export function frenchName(country: Country): string {
    return country.names.translations?.fra?.common ?? country.names.common;
}

// Code numérique ISO 3166-1 (= id des formes de world-atlas)
export function numericCode(country: Country): string | undefined {
    return country.codes?.ccn3 ?? country.uuid;
}

export function formatCurrencies(currencies?: unknown): string {
    const names = asItems(currencies).map(itemName).filter(Boolean);
    return names.length > 0 ? names.join(", ") : "-";
}

function asItems(value: unknown): unknown[] {
    if (!value) return [];
    return Array.isArray(value) ? value : Object.values(value as object);
}

const NAME_KEYS = ["name", "english_name", "english", "name_english", "label", "native_name", "native"];
const ID_KEYS = ["iso639_3", "iso639_2", "iso639_1", "iso639", "bcp47", "code", "id"];

// Nom lisible d'un élément (string ou objet) : essaie les clés connues,
// puis n'importe quelle propriété string dont le nom contient "name"
function itemName(item: unknown): string {
    if (typeof item === "string") return item;
    if (!item || typeof item !== "object") return "";
    const o = item as Record<string, unknown>;
    for (const key of NAME_KEYS) {
        if (typeof o[key] === "string" && o[key]) return o[key] as string;
    }
    const fuzzy = Object.entries(o).find(([k, v]) => /name|english/i.test(k) && typeof v === "string" && v);
    return fuzzy ? (fuzzy[1] as string) : "";
}

// Identifiant stable d'un élément, pour comparer deux listes (langues, monnaies)
function itemId(item: unknown, fallbackKey: string): string {
    if (typeof item === "string") return item;
    if (!item || typeof item !== "object") return fallbackKey;
    const o = item as Record<string, unknown>;
    for (const key of ID_KEYS) {
        if (typeof o[key] === "string" && o[key]) return o[key] as string;
    }
    return itemName(item) || fallbackKey;
}

// Clés comparables d'une collection : objet { fra: ... } ou tableau [{ iso639_3: "fra", ... }]
export function collectionKeys(value: unknown): string[] {
    if (!value) return [];
    if (Array.isArray(value)) return value.map((item, i) => itemId(item, String(i)));
    return Object.keys(value as object);
}

export function formatLanguages(languages?: unknown): string {
    const names = asItems(languages).map(itemName).filter(Boolean);
    return names.length > 0 ? names.join(", ") : "-";
}

// Remplace l'ancien champ `independent` (supprimé en v5) par classification.sovereign
export function isSovereign(country: Country): boolean {
    return country.classification?.sovereign === true;
}