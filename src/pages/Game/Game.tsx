import {Search} from "../../components/Game/Search.tsx";
import {useGame} from "../../contexts/GameContext.tsx";

export function Game() {
    const { selectedCountry } = useGame();
    console.log("SelectedCountry : " + selectedCountry?.name.official);

    return (
        <div
            className="
            w-screen flex justify-center
            "
        >
            <Search/>
        </div>
    )
}