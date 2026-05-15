import { usePokemonById } from "@/src/hooks/queries/usePokemonQueries";
import { getPokemonOfTheDayId } from "../utils/getPokemonOfTheDay";

export default function usePokemonOfTheDay() {
  const pokemonId = getPokemonOfTheDayId();

  const { data: pokemon, isLoading, error } = usePokemonById(pokemonId);

  return {
    pokemon,
    isLoading,
    error: error ? "Impossible to load Pokémon of the day." : "",
  };
}
