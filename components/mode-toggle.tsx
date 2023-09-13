"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { cn } from "@/lib/utils";

const ModeToggle = () => {
  const { theme, setTheme } = useTheme();

  console.log({ theme });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-full px-5 py-2 text-left">
        Theme
      </DropdownMenuTrigger>
      <DropdownMenuContent sideOffset={10}>
        {[
          {
            mode: "light",
            imageSrc: "/assets/light-theme.svg",
            description: <span>Light</span>,
          },
          {
            mode: "dark",
            imageSrc: "/assets/dark-theme.svg",
            description: <span>Dark</span>,
          },
          {
            mode: "system",
            imageSrc: "/assets/system-theme.svg",
            description: (
              <div className="flex flex-col space-y-1">
                <span>Automatic</span>
                <span>Follow system settings</span>
              </div>
            ),
          },
        ].map(({ mode, imageSrc, description }) => {
          const isSelected = theme === mode;
          return (
            <DropdownMenuItem
              onClick={() => setTheme(mode)}
              onSelect={(e) => {
                e.preventDefault();
              }}
              className={cn("rounded-none", {
                "shadow-[inset_2px_0_0_0_#0C66E4] dark:shadow-[inset_2px_0_0_0_#579DFF] bg-[#E9F2FF] dark:bg-[#092957]  text-[#0C66E4] dark:text-[#579DFF]":
                  isSelected,
              })}
            >
              <div className={cn("flex space-x-2 items-center py-3 px-2")}>
                <Image
                  src={imageSrc}
                  width={64}
                  height={48}
                  alt={`Select ${mode} theme`}
                  className="rounded-sm"
                />
                {description}
              </div>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ModeToggle;
