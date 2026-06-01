import './App.css'
import {Game} from "./pages/Game/Game.tsx";
import {useGame} from "./contexts/GameContext.tsx";

function App() {
    const {isWin} = useGame()
    return (
        <>
            {!isWin ? (
                <Game/>
            ) : (
                <div>
                    win
                </div>
                )}

        </>
    )
}

export default App
