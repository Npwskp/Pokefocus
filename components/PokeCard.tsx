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

type PokeCardProps = {
  name: string;
};

const PokeCard: React.FC<PokeCardProps> = ({ name }) => {
  const [image, setImage] = useState<string>("");

  useEffect(() => {
    const getPokemonPic = async () => {
      const res = await getPokemonSprites(name);
      setImage(res?.other["official-artwork"].front_default || "");
    };
    getPokemonPic();
  }, [name]);

  return (
    <Card
      className={cn("flex-1 h-[99%]", {
        invisible: !name,
      })}
    >
      <CardHeader>
        <CardTitle className="m-auto">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <img src={image} alt={name} />
      </CardContent>
      <CardFooter>
        <Button className="w-full">Select</Button>
      </CardFooter>
    </Card>
  );
};

export default PokeCard;
