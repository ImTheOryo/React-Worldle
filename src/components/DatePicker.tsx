import {useGame} from "../contexts/GameContext.tsx";

export function NativeDatePicker() {
    const {date, setDate, setIsWin, START_DATE} = useGame();
    const currentDate = new Date();

    const handleDateChange = (date: Date): void => {
        setIsWin(false);
        setDate(date);
    }

    const formatDateToYMD = (dateObj: Date): string => {
        if (!dateObj || isNaN(dateObj.getTime())) return '';
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const day = String(dateObj.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    return (
        <div className="mb-4">
            <label htmlFor={"datePicker"} className="block mb-2 font-bold text-gray-900">

            </label>
            <span className="block mb-2 text-sm text-gray-700">
                Format attendu : jj/mm/aaaa
            </span>
            <input
                type="date"
                id={"datePicker"}
                name={"datePicker"}
                value={date.toString()}
                onChange={(e) => handleDateChange(new Date(e.target.value))}
                min={formatDateToYMD(START_DATE)}
                max={formatDateToYMD(currentDate)}
                className={`
              block w-full max-w-sm p-2 bg-white rounded-md transition-shadow
              focus:outline-none focus:ring-2 focus:ring-offset-2
              border border-gray-500 focus:border-blue-600 focus:ring-blue-600
            `}
            />
        </div>
    );
}
