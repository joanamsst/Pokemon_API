import usePokemonOfTheDay from "@/src/hooks/usePokemonOfTheDay";
import { ActivityIndicator, Text, View } from "react-native";
import PokemonOfTheDayCard from "./PokemonOfTheDayCard";

export default function PokemonOfTheDay() {
  const { pokemon, isLoading, error } = usePokemonOfTheDay();

  if (isLoading) {
    return (
      <View className="h-80 items-center justify-center rounded-3xl bg-green-100">
        <ActivityIndicator size="large" color="#16a34a" />
      </View>
    );
  }

  if (error || !pokemon) {
    return (
      <View className="rounded-3xl bg-red-50 p-5">
        <Text className="font-semibold text-red-600">
          Impossible to load pokemon
        </Text>
      </View>
    );
  }
  return <PokemonOfTheDayCard pokemon={pokemon} />;
}
