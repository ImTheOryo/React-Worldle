import type { Country } from "../types/CountryType.ts";

const COLOR_EXACT = "bg-green-500 text-white border-green-600";
const COLOR_PARTIAL = "bg-orange-500 text-white border-orange-600";
const COLOR_WRONG = "bg-red-500 text-white border-red-600";

export function getGuessColor(guessedCountry: Country, targetCountry: Country, property: keyof Country): string {
    const guessedVal = guessedCountry[property];
    const targetVal = targetCountry[property];


    if (guessedVal === targetVal) {
        return COLOR_EXACT;
    }

    if (property === "languages" || property === "currencies") {
        if (!guessedVal || !targetVal) return COLOR_WRONG;

        const guessedKeys = Object.keys(guessedVal);
        const targetKeys = Object.keys(targetVal);

        const isExact = guessedKeys.length === targetKeys.length &&
            guessedKeys.every(key => targetKeys.includes(key));
        if (isExact) return COLOR_EXACT;

        const isPartial = guessedKeys.some(key => targetKeys.includes(key));
        if (isPartial) return COLOR_PARTIAL;

        return COLOR_WRONG;
    }

    return COLOR_WRONG;
}