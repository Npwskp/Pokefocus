import React, { useEffect, useState } from "react";
import { getPokemonSprites, sprites } from "@/service/evolution";
import { escape } from "querystring";

type PokemonName = {
  name: string;
  isIcon?: boolean;
};

export const useGetPokemonPic: React.FC<PokemonName> = ({ name, isIcon }) => {
  const [image, setImage] = useState<string>("");

  useEffect(() => {
    const fetchPokemonImage = async () => {
      try {
        const res = await getPokemonSprites(name);
        if (isIcon) {
          setImage(
            res?.front_default ||
              res?.other["official-artwork"].front_default ||
              ""
          );
        } else {
          setImage(res?.other["official-artwork"].front_default || "");
        }
      } catch (error) {
        console.error("Error fetching Pokemon image:", error);
      }
    };
    fetchPokemonImage();
  }, [name, isIcon]);

  return image;
};
