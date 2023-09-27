"use client";

import SideNav from "@/components/side-nav";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function BoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isNavOpen, setIsNavOpen] = useState(true);

  return (
    <div className={cn("grow basis-0 shrink-0 w-full flex relative")}>
      <SideNav isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />

      {children}
    </div>
  );
}
