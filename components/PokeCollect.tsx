"use client";

import React, { useContext, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { PokeListStore, usePokeListStore } from "@/app/LandingPage";
import CollectedCard from "./CollectedCard";
import usePokeCollect from "@/hook/usePokeCollect";
import { cn } from "@/lib/utils";

const PokeCollect = () => {
  const pokemonList = usePokeListStore((state) => state.pokeList);

  useEffect(() => {
    console.log(pokemonList);
  }, [pokemonList]);

  return (
    <div className="w-full h-full">
      <div className="text-center font-semibold text-xl my-4">
        Pokemon Collected Today
      </div>
      <div className="grid md:grid-cols-5 grid-cols-3 auto-rows-min gap-1 grid-flow-row overflow-auto lg:w-[30vw] md:[50vw] w-[80vw] h-[50dvh] border-accent m-auto border-2 rounded-lg bg-secondary mb-4 p-1">
        {pokemonList.map((poke, index) => {
          return (
            <div key={index}>
              <CollectedCard name={poke} idx={index} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PokeCollect;
