import { usePokeListStore } from "@/app/page";
import { useState, useEffect, useCallback, useContext } from "react";

const usePokeCollect = (pokemonName: string) => {
  const pokemonList = usePokeListStore((state) => state.pokeList);
  const setPokemonList = usePokeListStore((state) => state.setPokeList);
  // console.log(pokemonList, pokemonName);

  const resetStorage = useCallback(() => {
    localStorage.setItem("pokemonList", JSON.stringify([]));
    setPokemonList([]);
    setTimeMidnight();
  }, [setPokemonList]);

  const collectPokemon = () => {
    const newPokemonList = [...pokemonList, pokemonName];
    console.log(newPokemonList);
    setPokemonList(newPokemonList);
    localStorage.setItem("pokemonList", JSON.stringify(newPokemonList));
  };

  const setTimeMidnight = () => {
    const now = new Date();
    const time = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      0,
      0,
      0,
      0
    );
    localStorage.setItem("time", JSON.stringify(time));
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTime = localStorage.getItem("time");
      if (savedTime) {
        const time = new Date(JSON.parse(savedTime));
        const currentTime = new Date().getTime();
        if (currentTime > time.getTime() + 86400000) {
          resetStorage();
        }
      } else {
        setTimeMidnight();
      }

      const savedPokemonList = localStorage.getItem("pokemonList");
      if (savedPokemonList) {
        setPokemonList(JSON.parse(savedPokemonList));
      } else {
        localStorage.setItem("pokemonList", JSON.stringify([]));
        setPokemonList([]);
      }
    }
  }, [resetStorage, setPokemonList]);

  return { pokemonList, collectPokemon };
};

export default usePokeCollect;
