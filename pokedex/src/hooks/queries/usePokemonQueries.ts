import {
    getEvolutionChainByUrl,
    getPokedexPage,
    getPokemonById,
    getPokemonByIdOrName,
    getPokemonSpeciesByUrl,
} from "@/src/services/pokemonService";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export function usePokemonById(id: number) {
  return useQuery({
    queryKey: ["pokemon", id],
    queryFn: () => getPokemonById(id),
    enabled: !!id,
  });
}

export function usePokemonByIdOrName(idOrName: string) {
  return useQuery({
    queryKey: ["pokemon", idOrName],
    queryFn: () => getPokemonByIdOrName(idOrName),
    enabled: !!idOrName,
  });
}

export function usePokedexPokemonInfinite() {
  return useInfiniteQuery({
    queryKey: ["pokedex-pokemon"],
    initialPageParam: 0,
    queryFn: ({ pageParam }) => getPokedexPage(pageParam, 30),
    getNextPageParam: (lastPage) =>
      lastPage.next ? lastPage.nextOffset : undefined,
  });
}

export function usePokemonSpecies(url?: string) {
  return useQuery({
    queryKey: ["pokemon-species", url],
    queryFn: () => getPokemonSpeciesByUrl(url as string),
    enabled: !!url,
  });
}

export function useEvolutionChain(url?: string) {
  return useQuery({
    queryKey: ["evolution-chain", url],
    queryFn: () => getEvolutionChainByUrl(url as string),
    enabled: !!url,
  });
}
