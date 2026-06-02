import { useHistory } from "../../contexts/HistoryContext.tsx";
import { HistoryRow } from "./HistoryRow.tsx";

export function History() {
    const { guestedCountries } = useHistory();
    const headers = [
        "Pays", "Région", "Sous-région", "Monnaie(s)", "Langue(s)", "Indépendant", "Distance avec le pays recherché"
    ];

    return (
        <div className="w-full max-w-6xl mx-auto overflow-x-auto p-4 z-10">
            {guestedCountries.length > 0 && (
                <table className="w-full min-w-225 border-separate border-spacing-y-3" role="grid">
                    {/* EN-TÊTE */}
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

                    {/* CORPS -> historique */}
                    <tbody>
                    {guestedCountries.length === 0 ? (
                        <tr>
                            <td colSpan={6} className="p-8 text-center text-slate-500 rounded-lg bg-white shadow-sm border border-slate-200">
                                Aucun pays trouvé pour le moment.
                            </td>
                        </tr>
                    ) : (
                        guestedCountries.map((country) => (
                            <HistoryRow key={country.name.official} country={country} />
                        ))
                    )}
                    </tbody>
                </table>
            )}
        </div>
    );
}