import {useHistory} from "../../contexts/HistoryContext.tsx";

export function History() {
    const {guestedCountries} = useHistory()
    const headers = [
        "Country", "Region", "Subregion", "Currency(ies)", "Language(s)", "Is independent"
    ];


    return (
        <div className="w-full max-w-6xl mx-auto mt-8 overflow-x-auto p-4">
            {/* Conteneur avec une largeur minimale pour forcer le scroll sur petit écran */}
            {guestedCountries.length > 0 && (
                <div className="min-w-225 flex flex-col gap-4">

                    {/* EN-TÊTE */}
                    <div className="grid grid-cols-6 gap-3 text-sm font-bold uppercase">
                        {headers.map((header, index) => (
                            <div key={index} className="flex flex-col items-center justify-end">
                                <span className="mb-2 text-center">{header}</span>
                                {/* La petite barre blanche en dessous */}
                                <div className="w-4/5 h-1 bg-white rounded-full"></div>
                            </div>
                        ))}
                    </div>

                    {/* CORPS (Historique) */}
                    <div className="flex flex-col gap-3 mt-2">
                        {guestedCountries.length === 0 ? (
                            <div className="p-8 text-center rounded-lg">
                                Aucun pays trouvé pour le moment.
                            </div>
                        ) : (
                            guestedCountries.map((country) => (
                                <div
                                    key={country.name.official}
                                    className="grid grid-cols-6 gap-3"
                                >
                                    {/* 1. Country */}
                                    <div className=" border-2  flex items-center justify-center text-center p-2 min-h-25  font-bold shadow-md">
                                        {country.name.common}
                                    </div>

                                    {/* 2. Region */}
                                    <div className=" border-2  flex items-center justify-center text-center p-2 min-h-25  shadow-md">
                                        {country.region}
                                    </div>

                                    {/* 3. Subregion */}
                                    <div className=" border-2  flex items-center justify-center text-center p-2 min-h-25  shadow-md">
                                        {country.subregion || '-'}
                                    </div>

                                    {/* 4. Currency(ies) */}
                                    <div className=" border-2  flex items-center justify-center text-center p-2 min-h-25  shadow-md">
                                        {country.currencies
                                            ? Object.values(country.currencies).map(c => c.name).join(', ')
                                            : '-'}
                                    </div>

                                    {/* 5. Language(s) */}
                                    <div className=" border-2  flex items-center justify-center text-center p-2 min-h-25  shadow-md">
                                        {country.languages
                                            ? Object.values(country.languages).join(', ')
                                            : '-'}
                                    </div>

                                    {/* 6. Is independent */}
                                    <div className=" border-2  flex items-center justify-center text-center p-2 min-h-25 font-bold  shadow-md">
                                        {country.independent ? 'Yes' : 'No'}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                </div>
            )}
        </div>
    )
}