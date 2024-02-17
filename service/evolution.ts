import axiosInstance from "./axios";

type Pokemon = {
  name: string;
  url: string;
};

export const getAllPokemon = async (): Promise<Pokemon[]> => {
  const res = await axiosInstance
    .get("/pokemon?offset=0&limit=1025")
    .then((res) => res.data)
    .catch((err) => console.log(err));
  return res.results;
};
