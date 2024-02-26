import type { Metadata } from "next";
import { DM_Sans, Exo_2, Lexend, Quicksand, Roboto } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { createContext, useState } from "react";

const inter = Quicksand({ subsets: ["latin"], weight: "700" });

export const metadata: Metadata = {
  title: "PokeFocus",
  description: "Do a focus session to collect your favorite Pokemon",
  icons: {
    icon: "/pokeball.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="w-full h-full">
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem={true}
        storageKey="theme"
      >
        <body className={cn(inter.className, "bg-white dark:bg-[#0f0f0f]")}>
          {children}
        </body>
      </ThemeProvider>
    </html>
  );
}
