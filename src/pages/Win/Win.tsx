import { useEffect, useState } from "react";
import { useGame } from "../../contexts/GameContext.tsx";
import { useHistory } from "../../contexts/HistoryContext.tsx";

export function WinScreen() {
    const { selectedCountry } = useGame();
    const { guestedCountries } = useHistory();
    const [isOpen, setIsOpen] = useState<boolean>(true);

    const tries = guestedCountries.length;

    // Fermeture avec la touche Échap
    useEffect(() => {
        if (!isOpen) return;
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsOpen(false);
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [isOpen]);

    if (!selectedCountry || !isOpen) return null;

    return (
        <div
            role="dialog"
            aria-label="Félicitations"
            className="fixed w-full max-w-lg mx-auto mt-12 bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 animate-[fadeIn_0.5s_ease-out] z-40"
        >
            <div className="relative bg-sky-600 p-8 text-center text-white">
                <button
                    onClick={() => setIsOpen(false)}
                    aria-label="Fermer la fenêtre"
                    className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full text-white/80 hover:text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-white transition-colors"
                >
                    ✕
                </button>
                <h2 className="text-3xl font-bold mb-2">Félicitations !</h2>
                <p className="text-sky-100 text-lg">Vous avez trouvé le pays du jour.</p>
            </div>

            <div className="p-8 flex flex-col items-center">
                <div className="text-center mb-6">
                    <p className="text-sm uppercase tracking-widest text-slate-400 font-semibold mb-1">Destination</p>
                    <p className="text-4xl font-black text-slate-800">{selectedCountry.names.translations?.fra?.common ?? selectedCountry.names.common}</p>
                </div>

                <div className="flex gap-4 w-full justify-center mb-8">
                    <div className="bg-slate-50 rounded-xl p-4 text-center w-1/3 border border-slate-200 shadow-sm">
                        <p className="text-slate-500 text-xs uppercase font-bold mb-1">Essais</p>
                        <p className="text-3xl font-black text-sky-600">{tries}</p>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-4 text-center w-1/3 border border-slate-200 shadow-sm">
                        <p className="text-slate-500 text-xs uppercase font-bold mb-1">Région</p>
                        <p className="text-xl font-bold text-slate-700">{selectedCountry.region}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}