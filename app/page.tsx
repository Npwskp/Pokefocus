"use client";

import React, { createContext, useState } from "react";
import LandingPage from "./LandingPage";
import PokeCollect from "@/components/PokeCollect";

type AppContextType = {
  pokemonList: string[];
  setPokemonList: (pokemonList: string[]) => void;
};

export const AppContext = createContext<AppContextType>({
  pokemonList: [],
  setPokemonList: () => {},
});

const Page = () => {
  const [pokemonList, setPokemonList] = useState<string[]>([]);

  return (
    <AppContext.Provider value={{ pokemonList, setPokemonList }}>
      <LandingPage />
      <PokeCollect />
    </AppContext.Provider>
  );
};

export default Page;
