import {NativeDatePicker} from "../DatePicker.tsx";

export function ModalPlayOtherDay() {
    return (
        <div className="fixed top-22 right-6 z-50 bg-slate-50 rounded-xl p-6 border border-slate-200 shadow-lg flex flex-col items-center gap-4 w-80 transition-all hover:shadow-xl">
            <div className="text-center">
                <h3 className="text-slate-800 font-bold text-lg">Envie de rejouer ?</h3>
                <p className="text-slate-500 text-sm mt-1">Choisissez une autre date pour trouver un nouveau pays.</p>
            </div>

            <div className="w-full flex justify-center mt-2">
                <NativeDatePicker />
            </div>
        </div>
    )
}