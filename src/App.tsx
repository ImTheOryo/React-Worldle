import './App.css'
import {Game} from "./pages/Game/Game.tsx";

function App() {
    return (
        <div className="min-h-dvh bg-slate-50 font-sans text-slate-800 selection:bg-sky-200">
            <header className="w-full bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50 pt-[calc(0.75rem+env(safe-area-inset-top))] pb-3 sm:pt-[calc(1rem+env(safe-area-inset-top))] sm:pb-4">
                <div className="max-w-6xl mx-auto px-3 sm:px-4 flex items-center justify-center gap-3">
                    <h1 className="text-lg sm:text-2xl font-black tracking-tight text-slate-800 uppercase">
                        Un Jour, <span className="text-sky-600">Un Pays</span>
                    </h1>
                </div>
            </header>

            <main className="container mx-auto px-3 sm:px-4 pt-4 sm:pt-8 pb-[calc(1rem+env(safe-area-inset-bottom))] flex flex-col items-center">
                <Game />
            </main>
        </div>
    )
}

export default App
