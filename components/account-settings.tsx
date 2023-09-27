"use client";

import ModeToggle from "@/components/mode-toggle";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AccountSettings = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full focus-visible:shadow-none cursor-pointer bg-transparent"
        >
          <Avatar className="justify-center items-center flex w-6 h-6">
            A
          </Avatar>
          <span className="sr-only">Account and Settings</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="min-w-[232px]"
        alignOffset={5}
        align="end"
      >
        <DropdownMenuLabel className="px-5 py-2">My Account</DropdownMenuLabel>
        <DropdownMenuItem
          className="px-0"
          onSelect={(e) => {
            e.preventDefault();
          }}
        >
          <ModeToggle />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AccountSettings;
