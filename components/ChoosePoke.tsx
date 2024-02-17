import { getAllPokemon } from "@/service/evolution";
import React, { useEffect, useState } from "react";
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

const ChoosePoke = () => {
  const [pokeList, setPokeList] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const getPokemon = async () => {
      const res = await getAllPokemon();
      setPokeList(res);
    };

    getPokemon();
  }, []);

  console.log(pokeList);

  return (
    <>
      <div className="flex flex-row">
        <Dialog>
          <div className="flex flex-row">
            <DialogTrigger>
              <Button className="m-auto p-auto w-[120px] h-[50px]">
                <div className="flex flex-row gap-2 justify-center items-center">
                  <CiSquarePlus size={25} />
                  <div className="">
                    Choose <br />
                    Pokemon
                  </div>
                </div>
              </Button>
            </DialogTrigger>
            <div className="m-auto px-3">
              {input || "Choose Pokemon to breed"}
            </div>
          </div>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default ChoosePoke;
