"use sever";

import { getAllPokemon } from "@/service/evolution";
import React, { use, useEffect, useState } from "react";
import { set } from "react-hook-form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { CiSquarePlus } from "react-icons/ci";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

type ChoosePokeProps = {
  name: string;
  setName: (name: string) => void;
};

type Pokemon = {
  name: string;
  url: string;
};

const ChoosePoke = () => {
  const [pokeList, setPokeList] = useState<string[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const getPokemon = async () => {
      const res = await getAllPokemon();
      const pokeData = res.map((poke: Pokemon) => poke.name);
      setPokeList(pokeData.filter((poke) => poke.includes(input)));
    };
    getPokemon();
  }, [pokeList, input]);

  return (
    <>
      <div className="flex flex-row">
        <Dialog>
          <div className="flex flex-row">
            <DialogTrigger>
              <Button className="m-auto p-auto sm:w-[180px] h-[50px] w-[120px]">
                <div className="flex flex-row gap-2 justify-center items-center">
                  <CiSquarePlus size={25} />
                  <div className="text-wrap">Choose Pokemon</div>
                </div>
              </Button>
            </DialogTrigger>
            <div className="m-auto px-3">
              {input || "Choose Pokemon to breed"}
            </div>
          </div>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Choose Pokemon to breed</DialogTitle>
            </DialogHeader>
            <div className="h-[60vh] overflow-auto">
              <Input
                type="text"
                placeholder="Search Pokemon"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              {pokeList.map((poke) => (
                <div key={poke}>{poke}</div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default ChoosePoke;
