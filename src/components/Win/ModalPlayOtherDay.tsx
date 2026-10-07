import {NativeDatePicker} from "../DatePicker.tsx";

export function ModalPlayOtherDay() {
    return (
        <div className="w-full max-w-md bg-slate-50 rounded-xl p-4 sm:p-6 border border-slate-200 shadow-lg flex flex-col items-center gap-3 sm:gap-4 transition-shadow hover:shadow-xl">
            <div className="text-center">
                <h3 className="text-slate-800 font-bold text-lg">Envie de rejouer ?</h3>
                <p className="text-slate-500 text-sm mt-1">Choisissez une autre date pour trouver un nouveau pays.</p>
            </div>

            <div className="w-full flex justify-center">
                <NativeDatePicker />
            </div>
        </div>
    )
}
