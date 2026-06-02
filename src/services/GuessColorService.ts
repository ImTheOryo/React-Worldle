import type { Country } from "../types/CountryType.ts";

const COLOR_EXACT = "bg-green-700 text-white border-green-800"; // Ratio ~ 5.1:1
const COLOR_PARTIAL = "bg-orange-700 text-white border-orange-800"; // Ratio ~ 5.1:1
const COLOR_WRONG = "bg-red-700 text-white border-red-800"; // Ratio ~ 5.7:1

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