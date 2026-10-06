import type { Country } from "../types/CountryType.ts";
import {getDistanceBetweenTwoPoints} from "calculate-distance-between-coordinates";
import {collectionKeys, isSovereign} from "../utils/utils.ts";

const COLOR_EXACT = "bg-green-700 text-white border-green-800"; // Ratio ~ 5.1:1
const COLOR_PARTIAL = "bg-orange-700 text-white border-orange-800"; // Ratio ~ 5.1:1
const COLOR_WRONG = "bg-red-700 text-white border-red-800"; // Ratio ~ 5.7:1

export type GuessLevel = "exact" | "partial" | "wrong";

const LEVEL_CLASSES: Record<GuessLevel, string> = {
    exact: COLOR_EXACT,
    partial: COLOR_PARTIAL,
    wrong: COLOR_WRONG,
};

export function getGuessColor(guessedCountry: Country, targetCountry: Country, property: keyof Country): string {
    return LEVEL_CLASSES[getGuessLevel(guessedCountry, targetCountry, property)];
}

export function getGuessLevel(guessedCountry: Country, targetCountry: Country, property: keyof Country): GuessLevel {
    const guessedVal = guessedCountry[property];
    const targetVal = targetCountry[property];


    if (guessedVal === targetVal) {
        return "exact";
    }

    if (property === "classification") {
        return isSovereign(guessedCountry) === isSovereign(targetCountry) ? "exact" : "wrong";
    }

    if (property === "languages" || property === "currencies") {
        if (!guessedVal || !targetVal) return "wrong";

        const guessedKeys = collectionKeys(guessedVal);
        const targetKeys = collectionKeys(targetVal);

        const isExact = guessedKeys.length === targetKeys.length &&
            guessedKeys.every(key => targetKeys.includes(key));
        if (isExact) return "exact";

        const isPartial = guessedKeys.some(key => targetKeys.includes(key));
        if (isPartial) return "partial";

        return "wrong";
    }

    if (property === "coordinates") {
        const distance = getDistanceBetweenTwoPoints(
            {lat: guessedCountry.coordinates.lat, lon: guessedCountry.coordinates.lng},
            {lat: targetCountry.coordinates.lat, lon: targetCountry.coordinates.lng},
            "km"
        )

        if (distance === 0) return "exact";
        else if (distance <= 5000) return "partial"
        else return "wrong";

    }

    return "wrong";
}