import {useState} from "react";
import {useCountry} from "../../contexts/CountryContext.tsx";
import type {Country} from "../../types/CountryType.ts";
import {useGame} from "../../contexts/GameContext.tsx";

export function SearchBar() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { search, filteredCountries } = useCountry()
    const { guestedCountries, pushGuestedCountries } = useGame()

    return (
        <div className="relative w-72 font-sans">
            <label
                htmlFor="country-input"
                className="block text-sm font-medium text-gray-700 mb-1"
            >
                Choisissez un pays
            </label>

            <div className="relative">
                <input
                    id="country-input"
                    type="text"
                    role="combobox"
                    aria-expanded={isOpen}
                    aria-haspopup="listbox"
                    aria-controls={isOpen ? "country-listbox" : undefined}
                    aria-autocomplete="list"
                    className="
            w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md
            focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors
            "
                    placeholder="Rechercher …"
                    onChange={(e) => search(e.target.value, guestedCountries)}
                    onFocus={() => setIsOpen(true)}
                />
            </div>

            {isOpen && (
                <ul
                    id="country-listbox"
                    role="listbox"
                    aria-label="Liste des pays suggérés"
                    className="max-h-40 overflow-y-auto"
                >
                    {filteredCountries.map((country: Country) => (
                        <li
                            key={country.name.common}
                            role="option"
                            tabIndex={0}
                            aria-selected="false"
                            className="
                    px-4 py-2 text-sm cursor-pointer transition-colors text-gray-700
                    hover:bg-blue-50 hover:text-blue-700 hover:font-medium
                    focus:bg-blue-50 focus:text-blue-700 focus:font-medium focus:outline-none
                    "
                            onClick={() => {
                                pushGuestedCountries(country);
                                search('', guestedCountries);
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    pushGuestedCountries(country);
                                    search('', guestedCountries);
                                }
                            }}
                        >
                            {country.name.common}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}