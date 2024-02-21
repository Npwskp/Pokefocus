import type { Metadata } from "next";
import { Josefin_Sans, Open_Sans, Roboto } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { createContext, useState } from "react";

const inter = Roboto({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "PokeFocus",
  description: "Do a focus session to collect your favorite Pokemon",
  icons: {
    icon: "/pokeball.png",
  },
};

type AppContextType = {
  pokemonList: string[];
  setPokemonList: (pokemonList: string[]) => void;
};

export const AppContext = createContext<AppContextType>({
  pokemonList: [],
  setPokemonList: () => {},
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [pokemonList, setPokemonList] = useState<string[]>([]);
  return (
    <html lang="en" className="w-full h-full">
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem={true}
        storageKey="theme"
      >
        <AppContext.Provider value={{ pokemonList, setPokemonList }}>
          <body className={cn(inter.className, "bg-white dark:bg-[#0f0f0f]")}>
            {children}
          </body>
        </AppContext.Provider>
      </ThemeProvider>
    </html>
  );
}
