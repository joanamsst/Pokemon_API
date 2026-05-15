import { typeColors } from "@/src/constants/colors";
import { usePokemonDetails } from "@/src/hooks/usePokemonDetails";
import { addRecentlyViewedPokemon } from "@/src/services/asyncStorageService";
import { useEffect } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import BackButton from "../ui/BackButton";
import FavoriteButton from "../ui/FavouriteButton";
import AnimatedGradientBackground from "./AnimatedGradientBackground";
import PokemonAbout from "./PokemonAbout";
import PokemonBaseStats from "./PokemonBaseStats";
import PokemonDetailsHeader from "./PokemonDetailsHeader";
import PokemonEvolution from "./PokemonEvolution";
import PokemonInfoCard from "./PokemonInfoCard";
import PokemonMoves from "./PokemonMoves";

export default function PokemonDetails({ pokemonId }: { pokemonId: string }) {
  const { pokemon, species, evolutionChain, isLoading, error } =
    usePokemonDetails(pokemonId);

  useEffect(() => {
    if (!pokemon) return;

    const image =
      pokemon.sprites.other["official-artwork"].front_default ??
      pokemon.sprites.front_default;

    addRecentlyViewedPokemon({
      id: pokemon.id,
      name: pokemon.name,
      image,
    });
  }, [pokemon]);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-green-50">
        <ActivityIndicator size="large" color="#16a34a" />
      </View>
    );
  }

  if (error || !pokemon) {
    return (
      <View className="flex-1 items-center justify-center bg-green-50">
        <BackButton />
        <Text>Could not load Pokémon details.</Text>
      </View>
    );
  }

  const mainType = pokemon.types[0].type.name;
  const colors = typeColors[mainType] ?? typeColors.normal;

  return (
    <View
      style={{ backgroundColor: colors.bg }}
      className="flex-1 overflow-hidden"
    >
      <AnimatedGradientBackground color={colors.badge} />

      <ScrollView
        className="flex-1 pt-10"
        showsVerticalScrollIndicator={false}
        contentContainerClassName="px-5 pb-5"
      >
        <View className="absolute top-10 left-5 right-5 flex-row justify-between z-10">
          <BackButton />
          <FavoriteButton pokemon={pokemon} />
        </View>

        <PokemonDetailsHeader pokemon={pokemon} />
        <PokemonInfoCard pokemon={pokemon} />
        <PokemonBaseStats stats={pokemon.stats} />
        {evolutionChain && <PokemonEvolution evolutionChain={evolutionChain} />}
        <PokemonMoves moves={pokemon.moves} />
        <PokemonAbout species={species} />
      </ScrollView>
    </View>
  );
}
