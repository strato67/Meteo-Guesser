import { Card, CardTitle } from "./ui/card";
import { convertTemp } from "../app/game/[lobbyName]/unitConvert";

export default function GameBoard({
    selection,
    options,
    fahrenheit,
    setSelection,
    setUserAnswer,

}: {
    selection: number | null;
    options: string[];
    fahrenheit: boolean;
    setSelection: (index: number) => void;
    setUserAnswer: (index: string) => void;

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
                        setUserAnswer(options[index]);
                    }}
                >
                    <CardComponent
                        color={color}
                        activeSelection={selection == index}
                        option={options[index]}
                        fahrenheit={fahrenheit}
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
    fahrenheit,
}: {
    color: string;
    option: string;
    activeSelection?: boolean;
    fahrenheit:boolean;
}) {


    return (
        <Card
            className={`p-6 ${color} h-full text-white hover:scale-[1.01] ${activeSelection ? "border-4 border-indigo-700" : ""
                }`}
        >
            <div className="grid content-center justify-items-center h-full">
                <CardTitle className="md:text-2xl text-lg font-bold text-ellipsis overflow-hidden w-full  select-none">
                    {convertTemp(String(option),fahrenheit)}
                </CardTitle>
            </div>
        </Card>
    );
}
