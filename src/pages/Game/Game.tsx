import {SearchBar} from "../../components/Game/Searchbar.tsx";
import {History} from "../../components/Game/History.tsx";
import {WinScreen} from "../Win/Win.tsx";
import {useGame} from "../../contexts/GameContext.tsx";
import {ModalPlayOtherDay} from "../../components/Win/ModalPlayOtherDay.tsx";

export function Game() {

    const {isWin} = useGame()
    return (
        <div
            className="
            w-full max-w-5xl flex flex-col items-center gap-8
            "
        >
            <div className="text-center space-y-2 mt-4">
                <h2 className="text-3xl font-bold text-slate-800">Devinez la destination du jour</h2>
                <p className="text-slate-500 max-w-lg mx-auto">
                    Recherchez un pays et utilisez les indices géographiques et culturels pour trouver la bonne réponse.
                </p>
            </div>

            {isWin ?
                <>
                    <ModalPlayOtherDay/>
                    <WinScreen />
                </>
                :
                <SearchBar />
            }

            <History />
        </div>
    )


}