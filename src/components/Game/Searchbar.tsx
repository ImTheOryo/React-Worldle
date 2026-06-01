import {useMemo, useState} from "react";
import type {Country} from "../../types/CountryType.ts";
import {useHistory} from "../../contexts/HistoryContext.tsx";
import {useSearch} from "../../hooks/useSearch.ts";

export function SearchBar() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { pushGuestedCountries } = useHistory()
    const [searchInput, setSearchInput] = useState("");
    const { search } = useSearch()

    const filteredCountries = useMemo(() => {
        return search(searchInput)
    }, [searchInput, search])

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
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
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
                                setSearchInput("");
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    pushGuestedCountries(country);
                                    setSearchInput("");
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