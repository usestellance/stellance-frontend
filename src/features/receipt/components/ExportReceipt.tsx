import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ExportReceipt() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="rounded-[10px] h-[35px] font-light w-[76px] hover:bg-primary-500 hover:text-white lg:w-[120px] lg:h-[50px] lg:text-xl"
        >
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[76px] text-neutral-900 lg:w-[120px] p-2"
        align="center"
      >
        <DropdownMenuGroup>
          <DropdownMenuItem className="justify-center py-2 cursor-pointer hover:bg-primary-50 lg:text-lg hover:text-black-500">
            PDF
          </DropdownMenuItem>
          <DropdownMenuItem className="justify-center py-2 cursor-pointer hover:bg-primary-50 hover:text-black-500 lg:text-lg">
            Excel
          </DropdownMenuItem>
          <DropdownMenuItem className="justify-center py-2 cursor-pointer hover:bg-primary-50 hover:text-black-500 lg:text-lg">
            CSV
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
