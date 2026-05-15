import { usePokedexPokemonInfinite } from "@/src/hooks/queries/usePokemonQueries";
import { useMemo, useState } from "react";

export function usePokedex() {
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("all");

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePokedexPokemonInfinite();

  const allPokemon = useMemo(() => {
    return data?.pages.flatMap((page) => page.results) ?? [];
  }, [data]);

  const pokemon = useMemo(() => {
    return allPokemon.filter((pokemon) => {
      const matchesSearch = pokemon.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesType =
        selectedType === "all" || pokemon.types.includes(selectedType);

      return matchesSearch && matchesType;
    });
  }, [allPokemon, search, selectedType]);

  function loadMorePokemon() {
    if (!hasNextPage || isFetchingNextPage) return;

    fetchNextPage();
  }

  return {
    pokemon,
    search,
    setSearch,
    selectedType,
    setSelectedType,
    isLoading,
    isFetchingMore: isFetchingNextPage,
    loadMorePokemon,
    error: error ? "Failed to load Pokémon" : null,
  };
}
