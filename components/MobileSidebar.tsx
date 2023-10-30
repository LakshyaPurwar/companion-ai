import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild className="md:hidden pr-4">
        <Button variant="secondary">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"} className="flex w-fit p-6 bg-secondary">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
}

export default MobileSidebar;
