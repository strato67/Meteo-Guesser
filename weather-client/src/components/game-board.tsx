import { Card, CardTitle } from "./ui/card";

export default function GameBoard({
    selection,
    options,
    setSelection,
    setAnswer,
}: {
    selection: number | null;
    options: string[];
    setSelection: (index: number) => void;
    setAnswer: (index: string) => void;
}) {
    const cardColors = [
        "bg-red-500",
        "bg-blue-500",
        "bg-yellow-500",
        "bg-green-600",
    ];

    return (
        <div className="grid grid-cols-2 gap-1 w-full items-center h-full overflow-hidden">
            {cardColors.map((color, index) => (
                <div
                    key={index}
                    className="h-full"
                    onClick={() => {
                        setSelection(index);
                        setAnswer(options[index]);
                    }}
                >
                    <CardComponent
                        color={color}
                        activeSelection={selection == index}
                        option={options[index]}
                    />
                </div>
            ))}
        </div>
    );
}

function CardComponent({
    color,
    option,
    activeSelection,
}: {
    color: string;
    option: string;
    activeSelection?: boolean;
}) {
    return (
        <Card
            className={`p-6 ${color} h-full text-white hover:scale-[1.01] ${activeSelection ? "border-4 border-indigo-700" : ""
                }`}
        >
            <div className="grid content-center justify-items-center h-full">
                <CardTitle className="md:text-2xl text-lg font-bold text-ellipsis overflow-hidden w-full  select-none">
                    {option}
                </CardTitle>
            </div>
        </Card>
    );
}
