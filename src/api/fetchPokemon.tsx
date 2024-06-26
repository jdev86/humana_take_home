import axios from "axios";
import { baseUrl } from "./constants";

export const useFetchPokemon = () => {
  const getPokemon = async (limit = 30) => {
    const {
      data: { results },
    } = await axios.get(`${baseUrl}/pokemon`, {
      params: { limit },
    });

    return results;
  };

  const getPokemonDetails = async (url: string) => {
    const { data } = await axios.get(`${url}`);

    return data;
  };

  return { getPokemon, getPokemonDetails };
};
