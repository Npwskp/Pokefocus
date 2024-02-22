import React, { use, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { getPokemonSprites } from "@/service/evolution";
import { DialogClose } from "./ui/dialog";
import Image from "next/image";
import { useScreenSize } from "@/hook/useScreenSize";
import { useGetPokemonPic } from "@/hook/useGetPokemonPic";

type PokeCardProps = {
  name: string;
  setPokemon: (name: string) => void;
};

const PokeCard: React.FC<PokeCardProps> = ({ name, setPokemon }) => {
  const screenSize = useScreenSize();
  const image = useGetPokemonPic({ name, pictype: "Picture" });

  return (
    <Card
      className={cn(
        "flex-1 shadow-md dark:shadow-gray-800",
        {
          "h-[99%]": screenSize.width > 600,
          "h-[90%]": screenSize.width <= 600,
        },
        {
          invisible: !name,
        }
      )}
    >
      <CardHeader>
        <CardTitle className="m-auto text-lg sm:text-2xl">{name}</CardTitle>
      </CardHeader>
      <CardContent className="grid place-items-center">
        <Image
          src={image?.toString() || "/pokeball.png"}
          width={screenSize.width > 600 ? 200 : 100}
          height={screenSize.width > 600 ? 200 : 100}
          alt="pokemon"
          className=""
        />
      </CardContent>
      <CardFooter>
        <DialogClose className="w-full">
          <Button
            className="w-full"
            onClick={() => setPokemon(name)}
            variant="secondary"
            size={screenSize.width > 600 ? "default" : "sm"}
          >
            Select
          </Button>
        </DialogClose>
      </CardFooter>
    </Card>
  );
};

export default PokeCard;
