import { RecentlyViewedPokemon } from "@/src/types/pokemon";
import { router } from "expo-router";
import { Image, Pressable, Text } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function RecentlyViewedCard({
  pokemon,
}: {
  pokemon: RecentlyViewedPokemon;
}) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedPressable
      onPress={() => router.push(`/pokemon/${pokemon.id}`)}
      onPressIn={() => {
        scale.value = withSpring(0.9);
      }}
      onPressOut={() => {
        scale.value = withSpring(1);
      }}
      className="w-28 rounded-2xl bg-white p-3 shadow-sm"
      style={animatedStyle}
    >
      <Text className="text-xs font-bold text-zinc-500">
        #{String(pokemon.id).padStart(3, "0")}
      </Text>

      <Image
        source={{ uri: pokemon.image }}
        className="mx-auto mt-2 h-20 w-20"
        resizeMode="contain"
      />

      <Text className="mt-2 text-center text-sm font-bold capitalize text-zinc-700">
        {pokemon.name}
      </Text>
    </AnimatedPressable>
  );
}
