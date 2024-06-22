import { LoadingSpinner } from "../components/ui/loading-spinner"

export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center h-screen ">
            <LoadingSpinner size={56} />
        </div>
    )
};