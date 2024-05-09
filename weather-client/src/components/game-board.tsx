import { Card, CardTitle, CardDescription } from "./ui/card";


export default function GameBoard() {

    return (

            <div className="grid grid-cols-2 gap-2 w-full">
                <CardComponent />
                <CardComponent />
                <CardComponent />
                <CardComponent />
            </div>
    );
}

export function CardComponent() {
    return (
        <Card className="p-6 bg-stone-600">
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
        </Card>
    );
}
