"use client";

import React, { useContext, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { PokeListStore, usePokeListStore } from "@/app/LandingPage";
import CollectedCard from "./CollectedCard";
import usePokeCollect from "@/hook/usePokeCollect";

const PokeCollect = () => {
  const pokemonList = usePokeListStore((state) => state.pokeList);
  const [selectedPokemon, setSelectedPokemon] = useState<string>("");
  const { deletePokemon, ...trash } = usePokeCollect(selectedPokemon);

  useEffect(() => {
    console.log(selectedPokemon);
    console.log(pokemonList);
  }, [pokemonList, selectedPokemon]);

  return (
    <div className="w-full h-full">
      <div className="text-center font-semibold text-xl my-4">
        Pokemon Collected Today
      </div>
      <div className="grid md:grid-cols-5 grid-cols-3 gap-1 grid-flow-row overflow-auto lg:w-[30vw] md:[50vw] w-[80vw] h-[50dvh] border-accent m-auto border-2 rounded-lg bg-secondary mb-4 p-1">
        {pokemonList.map((poke, index) => {
          return (
            <div key={index}>
              <CollectedCard
                name={poke}
                setSelectedPokemon={setSelectedPokemon}
              />
            </div>
          );
        })}
      </div>
      <div className="grid place-items-center">
        <Button
          variant="destructive"
          className="m-auto"
          onClick={() => deletePokemon(selectedPokemon)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default PokeCollect;
