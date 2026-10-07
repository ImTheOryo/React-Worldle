import {SearchBar} from "../../components/Game/Searchbar.tsx";
import {History} from "../../components/Game/History.tsx";
import {WinScreen} from "../Win/Win.tsx";
import {useGame} from "../../contexts/GameContext.tsx";
import {ModalPlayOtherDay} from "../../components/Win/ModalPlayOtherDay.tsx";
import FlagConfetti from "../../components/FlagConfetti.tsx";
import {useState} from "react";
import {WorldMap} from "../../components/Game/WorldMap.tsx";
import {RulesModal} from "../../components/shared/RulesModal.tsx";

export function Game() {

    const {isWin} = useGame()
    const [isRulesOpen, setIsRulesOpen] = useState<boolean>(false);


    return (
        <div className="w-full max-w-5xl flex flex-col items-center gap-5 sm:gap-8">
            <div className="w-full flex justify-start">
                <button
                    onClick={() => setIsRulesOpen(true)}
                    className="min-h-11 px-4 py-2 text-sm font-semibold text-slate-700 bg-slate-200 hover:bg-slate-300 active:bg-slate-300 rounded-full transition-colors"
                    aria-label="Voir les règles du jeu"
                >
                    Règles du jeu
                </button>
            </div>

            <div className="text-center space-y-2">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">Devinez la destination du jour</h2>
                <p className="text-sm sm:text-base text-slate-500 max-w-lg mx-auto">
                    Recherchez un pays et utilisez les indices géographiques et culturels pour trouver la bonne réponse.
                </p>
            </div>

            <RulesModal isOpen={isRulesOpen} onClose={() => setIsRulesOpen(false)} />

            {isWin ?
                <>
                    <FlagConfetti/>
                    <ModalPlayOtherDay/>
                    <WinScreen />
                </>
                :
                <SearchBar />
            }
            <WorldMap />
            <History />
        </div>
    )


}