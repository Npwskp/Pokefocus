"use client";

import React, { useContext, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { usePokeListStore } from "@/app/page";
import { useStore } from "zustand";
import { useGetPokemonPic } from "@/hook/useGetPokemonPic";
import { getPokemonSprites } from "@/service/evolution";
import CollectedCard from "./CollectedCard";

const PokeCollect = () => {
  const pokemonList = usePokeListStore((state) => state.pokeList);

  useEffect(() => {}, [pokemonList]);

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
                <CollectedCard name={poke} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PokeCollect;
