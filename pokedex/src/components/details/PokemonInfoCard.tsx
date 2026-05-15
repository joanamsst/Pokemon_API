import { Text, View } from "react-native";

export default function PokemonInfoCard({ pokemon }: { pokemon: any }) {
  const height = pokemon.height / 10;
  const weight = pokemon.weight / 10;
  const ability = pokemon.abilities[0]?.ability.name.replace("-", " ");

  return (
    <View className="bg-white rounded-3xl p-5 flex-row justify-between mb-4 shadow-sm">
      <View className="items-center flex-1">
        <Text className="text-zinc-900 text-lg font-extrabold">{height} m</Text>
        <Text className="text-zinc-500 text-base">Height</Text>
      </View>

      <View className="w-px bg-zinc-200" />

      <View className="items-center flex-1">
        <Text className="text-zinc-900 text-lg font-extrabold">
          {weight} kg
        </Text>
        <Text className="text-zinc-500 text-base">Weight</Text>
      </View>

      <View className="w-px bg-zinc-200" />

      <View className="items-center flex-1">
        <Text className="text-zinc-900 text-lg font-extrabold capitalize">
          {ability}
        </Text>
        <Text className="text-zinc-500 text-base">Ability</Text>
      </View>
    </View>
  );
}
