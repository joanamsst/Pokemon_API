import PokemonDetails from "@/src/components/details/PokemonDetails";
import { useLocalSearchParams } from "expo-router";

export default function PokemonDetailsPage() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return <PokemonDetails pokemonId={id} />;
}
