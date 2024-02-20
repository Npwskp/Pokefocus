// useStoredPokemonList.ts

import { useState, useEffect } from "react";

interface StoredPokemon {
  name: string;
}

const useStoredPokemonList = () => {
  const [storedPokemonList, setStoredPokemonList] = useState<StoredPokemon[]>(
    []
  );

  useEffect(() => {
    // Check if window is defined to ensure code runs only in the browser
    if (typeof window !== "undefined") {
      const savedPokemonList = localStorage.getItem("pokemonList");
      if (savedPokemonList) {
        setStoredPokemonList(JSON.parse(savedPokemonList));
      }
    }
  }, []);

  return storedPokemonList;
};

export default useStoredPokemonList;
