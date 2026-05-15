import { ActivityIndicator, FlatList, Text, View } from "react-native";

import { pokemonTypes } from "@/src/constants/pokemonTypes";
import { usePokedex } from "@/src/hooks/usePokedex";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useRef } from "react";
import PokedexGrid from "./PokedexGrid";
import PokedexHeader from "./PokedexHeader";
import PokedexSearchBar from "./PokedexSearchBar";
import PokedexTypeFilters from "./PokedexTypeFilters";

export default function PokedexContent() {
  const {
    pokemon,
    search,
    setSearch,
    selectedType,
    setSelectedType,
    isLoading,
    isFetchingMore,
    loadMorePokemon,
    error,
  } = usePokedex();
  const { type } = useLocalSearchParams<{ type?: string }>();
  const typesListRef = useRef<FlatList<string>>(null);
  const pokedexListRef = useRef<FlatList>(null);

  useEffect(() => {
    pokedexListRef.current?.scrollToOffset({
      offset: 0,
      animated: true,
    });
  }, [selectedType, search]);

  useFocusEffect(
    useCallback(() => {
      pokedexListRef.current?.scrollToOffset({
        offset: 0,
        animated: false,
      });
    }, []),
  );

  useEffect(() => {
    if (typeof type !== "string") return;

    setSelectedType(type);

    const index = ["all", ...pokemonTypes].findIndex((item) => item === type);

    if (index !== -1) {
      setTimeout(() => {
        typesListRef.current?.scrollToIndex({
          index,
          animated: true,
          viewPosition: 0.5,
        });
      }, 100);
    }
  }, [type]);

  if (error) {
    return (
      <View className="flex-1 items-center justify-center px-5">
        <Text className="text-center text-red-500">{error}</Text>
      </View>
    );
  }

  return (
    <View className="px-5 pt-20">
      <PokedexHeader />

      <PokedexSearchBar search={search} onChangeSearch={setSearch} />

      <PokedexTypeFilters
        selectedType={selectedType}
        onSelectType={setSelectedType}
        listRef={typesListRef}
      />

      {isLoading ? (
        <View className="flex-1 mt-72">
          <ActivityIndicator size="large" color="#16a34a" />
        </View>
      ) : pokemon.length === 0 ? (
        <View className="mt-60 items-center px-8">
          <Text className="text-2xl font-extrabold text-zinc-800">
            No Pokémon found
          </Text>

          <Text className="mt-3 text-center text-base leading-6 text-zinc-500">
            Try searching with a different name or changing the selected type.
          </Text>
        </View>
      ) : (
        <PokedexGrid
          pokemon={pokemon}
          listRef={pokedexListRef}
          onEndReached={loadMorePokemon}
          isFetchingMore={isFetchingMore}
        />
      )}
    </View>
  );
}
