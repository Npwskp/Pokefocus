import React, { useEffect, useState } from "react";
import { getPokemonSprites, sprites } from "@/service/evolution";
import { escape } from "querystring";

type PicType = "Picture" | "Icon" | "Gif";

type PokemonName = {
  name: string;
  pictype: PicType;
};

export const useGetPokemonPic: React.FC<PokemonName> = ({ name, pictype }) => {
  const [image, setImage] = useState<string>("");

  useEffect(() => {
    const fetchPokemonImage = async () => {
      try {
        const res = await getPokemonSprites(name);
        if (pictype === "Icon") {
          setImage(
            res?.front_default ||
              res?.other["official-artwork"].front_default ||
              ""
          );
        } else if (pictype === "Gif") {
          setImage(
            res?.versions["generation-v"]["black-white"].animated
              .front_default ||
              res?.other.showdown.front_default ||
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
  }, [name, pictype]);

  return image;
};
