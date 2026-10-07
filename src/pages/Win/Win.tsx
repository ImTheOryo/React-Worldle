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
        // Fond cliquable : feuille en bas de l'écran sur mobile, fenêtre centrée à partir de sm
        <div
            className="fixed inset-0 z-40 flex items-end sm:items-center justify-center p-3 sm:p-6 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-label="Félicitations"
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-lg max-h-[90dvh] overflow-y-auto bg-white rounded-2xl shadow-xl border border-slate-100 animate-[fadeIn_0.5s_ease-out] pb-[env(safe-area-inset-bottom)]"
            >
                <div className="relative bg-sky-600 px-6 py-6 sm:p-8 text-center text-white">
                    <button
                        onClick={() => setIsOpen(false)}
                        aria-label="Fermer la fenêtre"
                        className="absolute top-2 right-2 w-10 h-10 flex items-center justify-center rounded-full text-white/80 hover:text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-white transition-colors"
                    >
                        ✕
                    </button>
                    <h2 className="text-2xl sm:text-3xl font-bold mb-2">Félicitations !</h2>
                    <p className="text-sky-100 text-base sm:text-lg">Vous avez trouvé le pays du jour.</p>
                </div>

                <div className="p-5 sm:p-8 flex flex-col items-center">
                    <div className="text-center mb-5 sm:mb-6">
                        <p className="text-xs sm:text-sm uppercase tracking-widest text-slate-400 font-semibold mb-1">Destination</p>
                        <p className="text-3xl sm:text-4xl font-black text-slate-800 break-words">
                            {selectedCountry.names.translations?.fra?.common ?? selectedCountry.names.common}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full">
                        <div className="bg-slate-50 rounded-xl p-3 sm:p-4 text-center border border-slate-200 shadow-sm">
                            <p className="text-slate-500 text-xs uppercase font-bold mb-1">Essais</p>
                            <p className="text-3xl font-black text-sky-600">{tries}</p>
                        </div>
                        <div className="bg-slate-50 rounded-xl p-3 sm:p-4 text-center border border-slate-200 shadow-sm">
                            <p className="text-slate-500 text-xs uppercase font-bold mb-1">Région</p>
                            <p className="text-lg sm:text-xl font-bold text-slate-700 break-words">{selectedCountry.region}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
