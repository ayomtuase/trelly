import AccountSettings from "@/components/account-settings";
import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import "./globals.css";

import localFont from 'next/font/local';
 
const segoeUI = localFont({src: [
  {
    path: './fonts/SegoeUI.woff2',
    weight: '400',
    style: 'normal',
  },
  {
    path: './fonts/SegoeUI-SemiBold.woff2',
    weight: '500',
    style: 'normal',
  },
  {
    path: './fonts/SegoeUI-SemiBold.woff2',
    weight: '600',
    style: 'normal',
  },
  {
    path: './fonts/SegoeUI-Bold.woff2',
    weight: '700',
    style: 'normal',
  },
  {
    path: './fonts/SegoeUI-BoldItalic.woff2',
    weight: '700',
    style: 'italic',
  },
]})

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
      <body className={segoeUI.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <main className="min-w-[100vw] max-w-[100vw] w-[100vw] min-h-[100vh] max-h-[100vh] flex flex-col">
            <nav className="flex justify-end px-2 py-2 bg-black/[0.16] dark:bg-[#1D2125] backdrop-blur">
              <AccountSettings />
            </nav>
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
