import { FavoritePokemon } from "@/src/context/FavoritesContext";
import { FlatList } from "react-native";
import FavoritePokemonCard from "./FavoritePokemonCard";

export default function FavoritesList({
  favorites,
}: {
  favorites: FavoritePokemon[];
}) {
  return (
    <FlatList
      data={favorites}
      keyExtractor={(item) => String(item.id)}
      numColumns={2}
      className="mt-6"
      columnWrapperStyle={{
        justifyContent: "space-between",
      }}
      contentContainerStyle={{ gap: 12, paddingBottom: 120 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => <FavoritePokemonCard pokemon={item} />}
    />
  );
}
