"use client";
import { Menu } from "lucide-react";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { ModeToggle } from "./ModeToggle";
import MobileSidebar from "./MobileSidebar";

const font = Poppins({
  weight: "600",
  subsets: ["latin"],
});

const Navbar = () => {
  return (
    <div className="fixed w-full z-50 flex items-center justify-between py-2 px-4 border-b border-primary/10 bg-secondary h-16">
      <div className="flex items-center">
        {/* <Menu className="block md:hidden" /> */}
        <MobileSidebar />
        <Link href="/">
          <h1
            className={cn(
              "hidden md:block text-xl font-bold text-primary",
              font.className
            )}
          >
            companion.ai
          </h1>
        </Link>
      </div>
      <div className="flex items-center justify-between gap-4">
        <Button variant={"premium"} className="mr-2" size={"sm"}>
          Upgrade
          <Sparkles className="h-4 w-4 fill-white text-white m-2" />
        </Button>
        <ModeToggle />
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default Navbar;
