import { router } from "expo-router";
import { Search, Star } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

export default function EmptyFavorites() {
  return (
    <View className="flex-1 items-center justify-center px-8">
      <View className="mb-6 h-28 w-28 items-center justify-center rounded-full bg-yellow-100">
        <Star size={52} color="#F2D235" fill="#F2D235" />
      </View>

      <Text className="text-center text-2xl font-extrabold text-zinc-900">
        No favorites yet
      </Text>

      <Text className="mt-3 text-center text-base leading-6 text-zinc-500">
        Start exploring the Pokédex and save your favorite Pokémon here.
      </Text>

      <Pressable
        onPress={() => router.push("/pokedex")}
        className="mt-8 flex-row items-center gap-2 rounded-full bg-zinc-900 px-6 py-4"
      >
        <Search size={18} color="#ffffff" />

        <Text className="font-bold text-white">Explore Pokédex</Text>
      </Pressable>
    </View>
  );
}
