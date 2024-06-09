import { Button } from "@/components/ui/button";
import { GearIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import useTempConversion from "@/hooks/useTempConversion";

export default function SettingsDropdown() {

  const {fahrenheit, setFahrenheit} = useTempConversion();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <GearIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Game Settings</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <div className="flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm w-full justify-between">
              <p>Temperature</p>
              <p className="self-end">
                °C <Switch className="" checked={fahrenheit} onCheckedChange={()=>setFahrenheit(!fahrenheit)}/> °F
              </p>
            </div>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

