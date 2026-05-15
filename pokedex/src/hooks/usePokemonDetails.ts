import {
  useEvolutionChain,
  usePokemonByIdOrName,
  usePokemonSpecies,
} from "@/src/hooks/queries/usePokemonQueries";

export function usePokemonDetails(pokemonId?: string) {
  const {
    data: pokemon,
    isLoading: isPokemonLoading,
    error: pokemonError,
  } = usePokemonByIdOrName(pokemonId ?? "");

  const {
    data: species,
    isLoading: isSpeciesLoading,
    error: speciesError,
  } = usePokemonSpecies(pokemon?.species?.url);

  const {
    data: evolutionChain,
    isLoading: isEvolutionLoading,
    error: evolutionError,
  } = useEvolutionChain(species?.evolution_chain?.url);

  return {
    pokemon,
    species,
    evolutionChain,
    isLoading: isPokemonLoading || isSpeciesLoading || isEvolutionLoading,
    error: pokemonError || speciesError || evolutionError,
  };
}
