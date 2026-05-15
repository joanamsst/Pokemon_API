import { PokemonCardData } from "@/src/types/pokemon";
import { ActivityIndicator, FlatList } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { PokemonGridCard } from "./PokemonGridCard";

type GridProps = {
  pokemon: PokemonCardData[];
  listRef: React.RefObject<FlatList<any> | null>;
  onEndReached: () => void;
  isFetchingMore: boolean;
};

export default function PokedexGrid({
  pokemon,
  listRef,
  onEndReached,
  isFetchingMore,
}: GridProps) {
  return (
    <FlatList
      ref={listRef}
      data={pokemon}
      keyExtractor={(item) => String(item.id)}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      contentContainerClassName="grow-0 pt-4 pb-28"
      columnWrapperClassName="justify-between"
      renderItem={({ item, index }) => (
        <Animated.View
          className="w-[48%]"
          entering={FadeInUp.duration(600).springify()}
        >
          <PokemonGridCard pokemon={item} />
        </Animated.View>
      )}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        isFetchingMore ? (
          <ActivityIndicator className="my-6" color="#16a34a" />
        ) : null
      }
    />
  );
}
