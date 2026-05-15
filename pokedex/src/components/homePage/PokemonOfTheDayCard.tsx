import { typeColors } from "@/src/constants/colors";
import { router } from "expo-router";
import { useEffect } from "react";
import { Image, Pressable, Text, View } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import FavouriteButton from "../ui/FavouriteButton";

export default function PokemonOfTheDayCard({ pokemon }: any) {
  const imageUrl =
    pokemon.sprites.other["official-artwork"].front_default ??
    pokemon.sprites.front_default;

  const mainType = pokemon.types[0].type.name;
  const colors = typeColors[mainType] ?? typeColors.normal;
  const floating = useSharedValue(0);
  const floatingStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: floating.value }],
  }));

  const textColor = useSharedValue(0);

  useEffect(() => {
    floating.value = -10;

    floating.value = withRepeat(withTiming(10, { duration: 1600 }), -1, true);
  }, []);

  const textAnimatedStyle = useAnimatedStyle(() => ({
    color: interpolateColor(textColor.value, [0, 1], ["#52525b", colors.text]),
  }));

  return (
    <View className="shadow-sm rounded-3xl">
      <View
        style={{ backgroundColor: colors.bg }}
        className="overflow-hidden rounded-3xl px-5 py-4"
      >
        <View className="flex-row justify-between">
          <Text className="text-base font-semibold text-zinc-600">
            Pokémon of the Day
          </Text>
          <FavouriteButton pokemon={pokemon} />
        </View>

        <View className="mt-3 flex-row text-xs items-center justify-between">
          <View className="flex-1">
            <Text style={{ color: colors.text }}>
              #{String(pokemon.id).padStart(3, "0")}
            </Text>

            <Text className="mt-1 text-4xl font-extrabold capitalize text-zinc-900">
              {pokemon.name}
            </Text>

            <View
              className="mt-3 flex-row items-center gap-1 self-start rounded-full px-2 py-1"
              style={{ backgroundColor: colors.badge }}
            >
              <Text className="text-xs font-bold uppercase text-white">
                {mainType}
              </Text>
            </View>

            <Pressable
              onPress={() => router.push(`/pokemon/${pokemon.id}`)}
              onPressIn={() => {
                textColor.value = withTiming(1, { duration: 120 });
              }}
              onPressOut={() => {
                textColor.value = withTiming(0, { duration: 1000 });
              }}
            >
              <Animated.Text
                className="mt-5 text-sm font-semibold"
                style={textAnimatedStyle}
              >
                View details ›
              </Animated.Text>
            </Pressable>
          </View>
          <Animated.View style={floatingStyle}>
            <Image
              source={{ uri: imageUrl }}
              className="h-32 w-32 mr-16"
              resizeMode="contain"
            />
          </Animated.View>
        </View>
      </View>
    </View>
  );
}
