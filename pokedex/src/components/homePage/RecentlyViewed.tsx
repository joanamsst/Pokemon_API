import { getRecentlyViewedPokemon } from "@/src/services/asyncStorageService";
import { RecentlyViewedPokemon } from "@/src/types/pokemon";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import RecentlyViewedCard from "./RecentlyViewedCard";

export default function RecentlyViewed() {
  const [recentPokemon, setRecentPokemon] = useState<RecentlyViewedPokemon[]>(
    [],
  );

  const textColor = useSharedValue(0);

  useFocusEffect(
    useCallback(() => {
      async function loadRecentlyViewed() {
        const data = await getRecentlyViewedPokemon();
        setRecentPokemon(data);
      }

      loadRecentlyViewed();
    }, []),
  );

  const textAnimatedStyle = useAnimatedStyle(() => ({
    color: interpolateColor(textColor.value, [0, 1], ["#16a34a", "#166534"]),
  }));

  if (recentPokemon.length === 0) {
    return (
      <View className="rounded-2xl bg-white p-5 shadow-sm">
        <Text className="mb-3 text-xl font-bold text-zinc-800">
          Recently viewed
        </Text>

        <Text className="text-base font-bold text-zinc-600">
          No Pokémon viewed yet
        </Text>

        <Text className="mt-1 text-sm text-zinc-500">
          Start exploring the Pokédex to see them here.
        </Text>
        <Pressable
          onPress={() => router.push("/pokedex")}
          onPressIn={() => {
            textColor.value = withTiming(1, { duration: 120 });
          }}
          onPressOut={() => {
            textColor.value = withTiming(0, { duration: 120 });
          }}
        >
          <Animated.Text
            className="mt-3 text-sm font-bold text-green-600"
            style={textAnimatedStyle}
          >
            Open Pokédex →
          </Animated.Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <View className="mb-3 flex-row items-center justify-between">
        <Text className="text-xl font-bold text-zinc-800">Recently viewed</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="gap-3 pr-5 p-1"
      >
        {recentPokemon.map((pokemon) => (
          <RecentlyViewedCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </ScrollView>
    </View>
  );
}
