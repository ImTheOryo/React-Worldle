import { useHistory } from "../../contexts/HistoryContext.tsx";
import { HistoryRow } from "./HistoryRow.tsx";
import { HistoryCard } from "./HistoryCard.tsx";

export function History() {
    const { guestedCountries } = useHistory();
    const headers = [
        "Pays", "Région", "Sous-région", "Monnaie(s)", "Langue(s)", "Indépendant", "Distance avec le pays recherché"
    ];

    if (guestedCountries.length === 0) return null;

    return (
        <div className="w-full max-w-6xl mx-auto">
            {/* Mobile / tablette : une carte par essai */}
            <ul className="flex flex-col gap-3 lg:hidden" aria-label="Historique des essais">
                {guestedCountries.map((country) => (
                    <HistoryCard key={country.names.official} country={country} />
                ))}
            </ul>

            {/* Écrans larges : tableau */}
            <div className="hidden lg:block overflow-x-auto p-4 z-10">
                <table className="w-full min-w-225 border-separate border-spacing-y-3" role="grid">
                    <thead>
                    <tr>
                        {headers.map((header, index) => (
                            <th
                                key={index}
                                scope="col"
                                className="pb-2 px-2 text-center text-xs font-bold text-slate-500 uppercase tracking-wider border-b-2 border-slate-200"
                            >
                                {header}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {guestedCountries.map((country) => (
                        <HistoryRow key={country.names.official} country={country} />
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
