import {SearchBar} from "../../components/Game/Searchbar.tsx";
import {History} from "../../components/Game/History.tsx";

export function Game() {
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