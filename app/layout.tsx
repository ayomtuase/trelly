import ModeToggle from "@/components/mode-toggle";
import { ThemeProvider } from "@/components/theme-provider";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AccountSettings from "@/components/account-settings";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trelly",
  description: "A Trello clone by Ayomide Oguntuase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <main className="min-w-[100vw] max-w-[100vw] min-h-[100vh] max-h-[100vh] flex flex-col">
            <nav className="flex justify-end px-2 py-2 bg-">
              <AccountSettings />
            </nav>
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
