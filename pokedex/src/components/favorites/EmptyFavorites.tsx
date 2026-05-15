import { router } from "expo-router";
import { Search, Star } from "lucide-react-native";
import { useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

export default function EmptyFavorites() {
  const progress = useSharedValue(0);
  const buttonScale = useSharedValue(1);
  const buttonOpacity = useSharedValue(1);

  useEffect(() => {
    progress.value = withRepeat(withTiming(1, { duration: 900 }), -1, true);
  }, []);

  const starAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(progress.value, [0, 0.5, 1], [1, 1.15, 1.05]),
      },
      {
        rotate: `${interpolate(progress.value, [0, 0.5, 1], [-8, 8, -6])}deg`,
      },
    ],
  }));

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    opacity: buttonOpacity.value,
    transform: [{ scale: buttonScale.value }],
  }));

  return (
    <View className="flex-1 items-center justify-center px-8">
      <View className="mb-6 h-28 w-28 items-center justify-center rounded-full bg-yellow-100">
        <Animated.View style={starAnimatedStyle}>
          <Star size={52} color="#F2D235" fill="#F2D235" />
        </Animated.View>
      </View>

      <Text className="text-center text-2xl font-extrabold text-zinc-900">
        No favorites yet
      </Text>

      <Text className="mt-3 text-center text-base leading-6 text-zinc-500">
        Start exploring the Pokédex and save your favorite Pokémon here.
      </Text>

      <Animated.View style={buttonAnimatedStyle}>
        <Pressable
          onPress={() => router.push("/pokedex")}
          onPressIn={() => {
            buttonScale.value = withTiming(0.95, { duration: 80 });
            buttonOpacity.value = withTiming(0.8, { duration: 90 });
          }}
          onPressOut={() => {
            buttonScale.value = withTiming(1, { duration: 100 });
            buttonOpacity.value = withTiming(1, { duration: 160 });
          }}
          className="mt-8 flex-row items-center gap-2 rounded-full bg-zinc-900 px-6 py-4"
        >
          <Search size={18} color="#ffffff" />
          <Text className="font-bold text-white">Explore Pokédex</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}
