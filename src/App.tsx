import './App.css'
import {Game} from "./pages/Game/Game.tsx";

function App() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-sky-200">
            <header className="w-full bg-white shadow-sm py-4 border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-4 flex items-center justify-center gap-3">
                    <h1 className="text-2xl font-black tracking-tight text-slate-800 uppercase">
                        Un Jour, <span className="text-sky-600">Un Pays</span>
                    </h1>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8 flex flex-col items-center">
                <Game />
            </main>
        </div>
    )
}

export default App
