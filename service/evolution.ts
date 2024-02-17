import axiosInstance from "./axios";

type Pokemon = {
  name: string;
  url: string;
};

type sprites = {
  back_default: string;
  back_female: string;
  back_shiny: string;
  back_shiny_female: string;
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
  other: {
    dream_world: {
      front_default: string;
      front_female: string;
    };
    home: {
      front_default: string;
      front_female: string;
      front_shiny: string;
      front_shiny_female: string;
    };
    "official-artwork": {
      front_default: string;
      front_shiny: string;
    };
    showdown: {
      back_default: string;
      back_female: string;
      back_shiny: string;
      back_shiny_female: string;
      front_default: string;
      front_female: string;
      front_shiny: string;
      front_shiny_female: string;
    };
  };
  versions: any;
};

export const getAllPokemon = async (): Promise<Pokemon[]> => {
  const res = await axiosInstance
    .get("/pokemon?offset=0&limit=1025")
    .then((res) => res.data)
    .catch((err) => console.log(err));
  return res.results;
};

export const getPokemonSprites = async (
  name: string
): Promise<sprites | undefined> => {
  const res = await axiosInstance
    .get(`/pokemon/${name}`)
    .then((res) => res.data.sprites)
    .catch((err) => console.log(err));
  return res;
};
