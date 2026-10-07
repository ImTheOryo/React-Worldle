import {getDistanceBetweenTwoPoints} from "calculate-distance-between-coordinates";
import type {Country} from "../types/CountryType.ts";
import {getGuessColor} from "../services/GuessColorService.ts";
import {formatCurrencies, formatLanguages, isSovereign} from "./utils.ts";

export interface GuessCell {
    label: string;
    value: string;
    cls: string; // classes Tailwind de couleur (vert / orange / rouge)
}

// Données d'une ligne d'historique, partagées par le tableau (desktop) et les cartes (mobile)
export function buildGuessCells(country: Country, target: Country): { nameCls: string; cells: GuessCell[] } {
    const nameCls = country.names.common === target.names.common
        ? "bg-green-700 text-white border-green-800"
        : "bg-red-700 text-white border-red-800";

    const distance = getDistanceBetweenTwoPoints(
        {lat: country.coordinates.lat, lon: country.coordinates.lng},
        {lat: target.coordinates.lat, lon: target.coordinates.lng},
        "km"
    );

    const cells: GuessCell[] = [
        {label: "Région", value: country.region || "-", cls: getGuessColor(country, target, "region")},
        {label: "Sous-région", value: country.subregion || "-", cls: getGuessColor(country, target, "subregion")},
        {label: "Monnaie(s)", value: formatCurrencies(country.currencies), cls: getGuessColor(country, target, "currencies")},
        {label: "Langue(s)", value: formatLanguages(country.languages), cls: getGuessColor(country, target, "languages")},
        {label: "Indépendant", value: isSovereign(country) ? "Oui" : "Non", cls: getGuessColor(country, target, "classification")},
        {label: "Distance", value: `${Math.round(distance).toLocaleString("fr-FR")} km`, cls: getGuessColor(country, target, "coordinates")},
    ];

    return {nameCls, cells};
}
