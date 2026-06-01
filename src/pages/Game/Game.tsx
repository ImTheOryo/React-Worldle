import {SearchBar} from "../../components/Game/Searchbar.tsx";
import {useGame} from "../../contexts/GameContext.tsx";
import {History} from "../../components/Game/History.tsx";

export function Game() {
    const { selectedCountry } = useGame();
    console.log("SelectedCountry : " + selectedCountry?.name.official);

    return (
        <div
            className="
            w-screen flex justify-center
            "
        >
            <SearchBar/>
            <History/>
        </div>
    )
}