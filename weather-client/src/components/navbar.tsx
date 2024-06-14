import Link from "next/link";
import { ModeToggle } from "./mode-toggle";

export default function Navbar() {
  return (
    <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6 top-0 fixed z-30">
      <Link className="mr-6 lg:flex" href="/">
        <LightningIcon className="h-6 w-6" />
        <span className="sr-only">Acme Inc</span>
      </Link>
      <nav className="ml-auto lg:flex gap-6">
        <ModeToggle />
      </nav>
    </header>
  );
}

function LightningIcon(_props: any) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <title>lightning [#1262]</title>
      <desc>Created with Sketch.</desc>
      <defs></defs>
      <g
        id="Page-1"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g
          id="Dribbble-Light-Preview"
          transform="translate(-62.000000, -2559.000000)"
          fill="currentColor"
        >
          <g id="icons" transform="translate(56.000000, 160.000000)">
            <polygon
              id="lightning-[#1262]"
              points="14 2419 14 2411 6 2411 14 2399 14 2407 22 2407"
            ></polygon>
          </g>
        </g>
      </g>
    </svg>
  );
}
