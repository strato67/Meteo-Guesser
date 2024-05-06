import Link from "next/link"
import { ModeToggle } from "./mode-toggle"

export default function Component() {
    return (
        <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6 top-0">
            
            <Link className="mr-6 lg:flex" href="#">
                <MountainIcon className="h-6 w-6" />
                <span className="sr-only">Acme Inc</span>
            </Link>
            <nav className="ml-auto lg:flex gap-6">
                <ModeToggle />

            </nav>
        </header>
    )
}

function MountainIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
        </svg>
    )
}