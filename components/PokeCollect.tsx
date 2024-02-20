"use client";

import useStoredPokemonList from "@/hook/useStorePokemonList";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { AppContext } from "@/app/page";

const PokeCollect = () => {
  const { pokemonList } = useContext(AppContext);
  useEffect(() => {
    console.log(pokemonList);
  }, [pokemonList]);

  return (
    <div className="w-full h-full">
      <div className="text-center font-semibold text-xl my-4">
        Pokemon Collected Today
      </div>
      <div className="sm:w-[30vw] w-[80vw] h-[30dvh] border-accent m-auto border-2 rounded-lg bg-secondary mb-4">
        <div className="flex flex-row overflow-auto w-full h-full">
          {pokemonList.map((poke, index) => {
            return (
              <div key={index}>
                <Button
                  variant="ghost"
                  className="focus-visible:outline-dashed focus-visible:ring-0 focus-visible:ring-offset-0"
                >
                  {poke}
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PokeCollect;
