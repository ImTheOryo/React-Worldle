import { useHistory } from "../../contexts/HistoryContext.tsx";
import { HistoryRow } from "./HistoryRow.tsx";

export function History() {
    const { guestedCountries } = useHistory()
    const headers = [
        "Country", "Region", "Subregion", "Currency(ies)", "Language(s)", "Is independent"
    ];

    return (
        <div className="w-full max-w-6xl mx-auto mt-8 overflow-x-auto p-4">
            {guestedCountries.length > 0 && (
                <div className="min-w-225 flex flex-col gap-4">

                    {/* EN-TÊTE */}
                    <div className="grid grid-cols-6 gap-3 text-sm font-bold uppercase">
                        {headers.map((header, index) => (
                            <div key={index} className="flex flex-col items-center justify-end">
                                <span className="mb-2 text-center">{header}</span>
                                <div className="w-4/5 h-1 bg-white rounded-full"></div>
                            </div>
                        ))}
                    </div>

                    {/* CORPS (Historique des tentatives) */}
                    <div className="flex flex-col mt-2">
                        {guestedCountries.length === 0 ? (
                            <div className="p-8 text-center rounded-lg">
                                Aucun pays trouvé pour le moment.
                            </div>
                        ) : (
                            guestedCountries.map((country) => (
                                <HistoryRow key={country.name.official} country={country} />
                            ))
                        )}
                    </div>

                </div>
            )}
        </div>
    )
}