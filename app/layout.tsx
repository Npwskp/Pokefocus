import type { Metadata } from "next";
import { Josefin_Sans, Open_Sans, Roboto } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

const inter = Roboto({ subsets: ["latin"], weight: "400" });

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
