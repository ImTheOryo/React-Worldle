import { useEffect } from "react";

interface RulesModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function RulesModal({ isOpen, onClose }: RulesModalProps) {


    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);


    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm transition-opacity"
            role="dialog"
            aria-modal="true"
            aria-labelledby="rules-title"
            onClick={onClose}
        >
            {/* Conteneur de la modale : stopPropagation empêche la fermeture si on clique à l'intérieur */}
            <div
                className="relative w-full max-w-md p-6 bg-white shadow-2xl rounded-2xl cursor-default"
                onClick={(e) => e.stopPropagation()}
            >

                {/* Bouton de fermeture en haut à droite */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition-colors"
                    aria-label="Fermer les règles"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <h2 id="rules-title" className="text-2xl font-bold mb-4 text-slate-800">
                    Comment jouer ? ✈️
                </h2>

                <div className="space-y-4 text-slate-600 text-sm">
                    <p>
                        Le but du jeu est de deviner la <strong>Destination Mystère</strong> du jour. Vous avez autant d'essais que nécessaire.
                    </p>
                    <p>
                        À chaque tentative, les informations du pays que vous proposez seront comparées avec celles du pays cible. Les couleurs vous guideront :
                    </p>

                    <ul className="space-y-3 mt-4">
                        <li className="flex items-center gap-3">
                            <span className="flex items-center justify-center w-8 h-8 font-bold text-white rounded bg-emerald-600">v</span>
                            <span><strong>Vert :</strong> La donnée est identique (Correspondance exacte).</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="flex items-center justify-center min-w-8 min-h-8 font-bold rounded bg-orange-700 text-white border-orange-800">≈</span>
                            <span><strong>Orange :</strong> Vous avez au moins une monnaie ou langue en commun ou alors une distance avec le pays cible inférieure à 5 000 kms  (Correspondance partielle).</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="flex items-center justify-center w-8 h-8 font-bold text-white rounded bg-rose-600">✗</span>
                            <span><strong>Rouge :</strong> La donnée est incorrecte.</span>
                        </li>
                    </ul>

                    <div className="pt-4 mt-4 border-t border-slate-100">
                        <p className="font-semibold text-slate-800">Prêt au décollage ?</p>
                        <p className="text-xs text-slate-500 mt-1">Une nouvelle destination est disponible chaque jour à minuit.</p>
                    </div>
                </div>

                <button
                    onClick={onClose}
                    className="w-full py-3 mt-6 font-semibold text-white transition-colors rounded-lg bg-sky-600 hover:bg-sky-700 shadow-sm"
                >
                    Commencer à jouer
                </button>
            </div>
        </div>
    );
}