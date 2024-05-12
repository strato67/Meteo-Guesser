import { LoadingSpinner } from "./ui/loading-spinner";

export default function LoadingGame() {
    return(<>
    <div className="flex flex-col w-full items-center min-h-screen justify-center gap-4">
        <LoadingSpinner />
        <h1>Connecting to server...</h1>
    </div>
    
    </>);
}