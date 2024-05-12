import { Card, CardTitle } from "./ui/card";

export default function GameBoard({
    selection,
    setSelection,
}: {
    selection: number | null;
    setSelection: (index: number) => void;
}) {
    const cardColors = [
        "bg-red-500",
        "bg-blue-500",
        "bg-yellow-500",
        "bg-green-600",
    ];

    const handleClick = (index: number) => {
        setSelection(index);
    };

    return (
        <div className="grid grid-cols-2 gap-1 w-full items-center h-full overflow-hidden">
            {cardColors.map((color, index) => (
                <div key={index} className="h-full" onClick={() => handleClick(index)}>
                    <CardComponent color={color} activeSelection={selection == index} />
                </div>
            ))}
        </div>
    );
}

function CardComponent({
    color,
    activeSelection,
}: {
    color: string;
    activeSelection?: boolean;
}) {
    return (
        <Card
            className={`p-6 ${color} h-full text-white hover:scale-[1.01] ${activeSelection ? "border-4 border-indigo-700" : ""
                }`}
        >
            <div className="grid content-center justify-items-center h-full">
                <CardTitle className="md:text-2xl text-lg font-bold text-ellipsis overflow-hidden w-full  select-none">
                    Card Title
                </CardTitle>
            </div>
        </Card>
    );
}
