import EmptyFavorites from "@/src/components/favorites/EmptyFavorites";
import FavoritesList from "@/src/components/favorites/FavoritesList";
import HomeButton from "@/src/components/ui/HomeButton";
import { useFavorites } from "@/src/context/FavoritesProvider";
import { Text, View } from "react-native";

export default function FavoritesScreen() {
  const { favorites } = useFavorites();

  return (
    <View className="flex-1 bg-white px-5 pt-20">
      <View className="flex-row items-center justify-between">
        <Text className="text-3xl font-bold text-zinc-900">Favorites</Text>

        <HomeButton />
      </View>

      {favorites.length === 0 ? (
        <EmptyFavorites />
      ) : (
        <FavoritesList favorites={favorites} />
      )}
    </View>
  );
}
