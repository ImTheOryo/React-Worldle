import {useEffect, useMemo, useRef, useState} from "react";
import type {Country} from "../../types/CountryType.ts";
import {useHistory} from "../../contexts/HistoryContext.tsx";
import {useSearch} from "../../hooks/useSearch.ts";
import {frenchName} from "../../utils/utils.ts";

export function SearchBar() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { pushGuestedCountries } = useHistory()
    const [searchInput, setSearchInput] = useState("");
    const { search } = useSearch()
    const containerRef = useRef<HTMLDivElement>(null);

    const filteredCountries = useMemo(() => {
        return search(searchInput)
    }, [searchInput, search])

    // Ferme la liste en cliquant / touchant ailleurs ou avec Échap
    useEffect(() => {
        if (!isOpen) return;
        const onPointerDown = (e: PointerEvent) => {
            if (!containerRef.current?.contains(e.target as Node)) setIsOpen(false);
        };
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsOpen(false);
        };
        document.addEventListener("pointerdown", onPointerDown);
        document.addEventListener("keydown", onKeyDown);
        return () => {
            document.removeEventListener("pointerdown", onPointerDown);
            document.removeEventListener("keydown", onKeyDown);
        };
    }, [isOpen]);

    const select = (country: Country) => {
        pushGuestedCountries(country);
        setSearchInput("");
        setIsOpen(false);
    };

    return (
        <div ref={containerRef} className="relative w-full max-w-md font-sans">
            <label
                htmlFor="country-input"
                className="block text-sm font-medium text-gray-700 mb-1"
            >
                Choisissez un pays
            </label>

            <input
                id="country-input"
                type="text"
                role="combobox"
                aria-expanded={isOpen}
                aria-haspopup="listbox"
                aria-controls={isOpen ? "country-listbox" : undefined}
                aria-autocomplete="list"
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
                enterKeyHint="go"
                // text-base (16 px) : évite le zoom automatique d'iOS au focus
                className="
                    w-full min-h-12 px-4 py-2 text-base text-gray-700 bg-white border border-gray-300 rounded-lg
                    focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors
                "
                placeholder="Rechercher …"
                value={searchInput}
                onChange={(e) => {
                    setSearchInput(e.target.value);
                    setIsOpen(true);
                }}
                onFocus={() => setIsOpen(true)}
                onKeyDown={(e) => {
                    // Entrée : valide le premier résultat
                    if (e.key === "Enter" && filteredCountries[0]) {
                        e.preventDefault();
                        select(filteredCountries[0]);
                    }
                }}
            />

            {isOpen && (
                <ul
                    id="country-listbox"
                    role="listbox"
                    aria-label="Liste des pays suggérés"
                    className="absolute left-0 right-0 z-30 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-56 sm:max-h-64 overflow-y-auto overscroll-contain"
                >
                    {filteredCountries.length === 0 && (
                        <li className="px-4 py-3 text-sm text-slate-500">Aucun pays trouvé.</li>
                    )}
                    {filteredCountries.map((country: Country) => (
                        <li
                            key={country.names.common}
                            role="option"
                            tabIndex={0}
                            aria-selected="false"
                            className="
                                min-h-11 px-4 py-2.5 text-base sm:text-sm cursor-pointer transition-all text-gray-700
                                flex items-center gap-3
                                hover:bg-blue-50 hover:text-blue-700 hover:font-medium
                                active:bg-blue-100
                                focus:bg-blue-50 focus:text-blue-700 focus:font-medium
                                focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-600
                                first:rounded-t-lg last:rounded-b-lg
                            "
                            onClick={() => select(country)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    select(country);
                                }
                            }}
                        >
                            <img
                                className="fit-picture w-7 sm:w-6 h-auto shrink-0 shadow-sm"
                                src={country.flag.url_png}
                                alt=''
                                aria-hidden="true"
                            />

                            <span>{frenchName(country)}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
