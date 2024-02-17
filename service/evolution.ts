import axiosInstance from "./axios";

export const getAllPokemon = async () => {
  try {
    const res = await axiosInstance.get("/pokemon?offset=0&limit=2000");
    return res.data.results;
  } catch (err) {
    console.log(err);
  }
};
