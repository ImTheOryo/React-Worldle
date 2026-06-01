interface HistoryCellProps {
    value: string | boolean | number | null | undefined;
    cssClass: string;
}

export function HistoryCell({ value, cssClass }: HistoryCellProps) {
    return (
        <div className={cssClass}>
            {value || '-'}
        </div>
    )
}