"use client";

import React, { createContext, useState } from "react";
import LandingPage from "./LandingPage";
import PokeCollect from "@/components/PokeCollect";
import { create } from "zustand";

export interface PokeListStore {
  pokeList: string[];
  setPokeList: (pokeList: string[]) => void;
}

export const usePokeListStore = create<PokeListStore>()((set) => ({
  pokeList: [],
  setPokeList: (pokeList: string[]) =>
    set((state) => ({
      ...state,
      pokeList,
    })),
}));

const Page = () => {
  return (
    <div className="">
      <LandingPage />
      <PokeCollect />
    </div>
  );
};

export default Page;
