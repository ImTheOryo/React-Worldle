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
                    className="z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-40 overflow-y-auto"
                >
                    {filteredCountries.map((country: Country) => (
                        <li
                            key={country.name.common}
                            role="option"
                            tabIndex={0}
                            aria-selected="false"
                            className="
                    px-4 py-2 text-sm cursor-pointer transition-all text-gray-700
                    flex items-center gap-3
                    hover:bg-blue-50 hover:text-blue-700 hover:font-medium
                    focus:bg-blue-50 focus:text-blue-700 focus:font-medium
                    focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-600
                    first:rounded-t-lg last:rounded-b-lg
                "
                            onClick={() => {
                                pushGuestedCountries(country);
                                setSearchInput("");
                                setIsOpen(false);
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    pushGuestedCountries(country);
                                    setSearchInput("");
                                    setIsOpen(false);
                                }
                            }}
                        >
                            <img
                                className="fit-picture w-6 h-auto shrink-0 shadow-sm"
                                src={country.flags.png}
                                alt=''
                                aria-hidden="true"
                            />

                            <span>{country.translations.fra.common}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}