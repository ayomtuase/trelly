"use client";

import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction, useState } from "react";
import { Avatar } from "./ui/avatar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

const SideNav = ({
  isNavOpen,
  setIsNavOpen,
}: {
  isNavOpen: boolean;
  setIsNavOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <nav
      className={cn(
        "self-stretch text-white z-10 overflow-y-auto backdrop-blur bg-black/[0.16] relative dark:bg-[hsla(206,13.7%,10%,0.9)]",
        {
          "min-w-4 w-4": !isNavOpen,
          "min-w-[260px] w-[260px] max-w-[260px]": isNavOpen,
        }
      )}
      onClick={!isNavOpen ? () => setIsNavOpen(true) : undefined}
    >
      <div className="overflow-x-hidden">
        {isNavOpen ? (
          <Button
            variant="outline"
            size="icon"
            className="rounded absolute top-3 z-10 -right-5"
            onClick={() => setIsNavOpen(true)}
          >
            <ChevronRight className="" />
          </Button>
        ) : null}
        <div
          className={cn("flex flex-col w-full h-full", {
            hidden: !isNavOpen,
          })}
        >
          <div className="flex justify-between items-center px-3 py-2 border-y-2 border-[hsla(211,18%,68%,0.16)]">
            <div className="flex space-x-2 items-center">
              <Avatar className="bg-[linear-gradient(rgb(202,53,33),rgb(250,165,61))] dark:bg-[linear-gradient(#F87462,#974F0C)]  text-base text-center rounded-sm font-bold text-white dark:text-black w-8 h-8 flex justify-center items-center">
                <span>A</span>
              </Avatar>
              <span className="font-semibold">Ayomide workspace</span>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsNavOpen(false)}
              className="h-8 w-8 border-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>

          <p className="pl-3 font-semibold pt-3 pb-2">Your boards</p>
          <div className="py-1.5">
            {[
              {
                icon: "🚀",
                text: "Test board",
              },
            ].map(({ icon, text }) => (
              <div key={text} className="space-x-2 pl-3">
                <span>{icon}</span>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SideNav;
