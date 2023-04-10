"use client";
interface MenuItem {
    onClick: () => void;
    label: string;
}

export const MenuItem: React.FC<MenuItem> = ({onClick, label}) => {
    return (
        <div 
        onClick={onClick}
        className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
        >
        {label}
        </div>
    )
}