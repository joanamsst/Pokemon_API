import { typeColors } from "@/src/constants/colors";
import { PokemonCardData } from "@/src/types/pokemon";
import { router } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function PokemonGridCard({ pokemon }: { pokemon: PokemonCardData }) {
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
      className="mb-4 rounded-3xl bg-white p-4 shadow-sm"
      style={animatedStyle}
    >
      <Image
        source={{ uri: pokemon.imageUrl }}
        className="h-32 w-full"
        resizeMode="contain"
      />

      <Text className="mt-2 text-center font-bold capitalize text-zinc-900">
        {pokemon.name}
      </Text>

      <View className="mt-2 flex-row justify-center gap-1">
        {pokemon.types.map((type) => {
          const typeColor = typeColors[type] ?? typeColors.normal;

          return (
            <View
              key={type}
              style={{ backgroundColor: typeColor.bg }}
              className="rounded-full px-2 py-1 shadow-sm drop-shadow-sm shadow-gray-300"
            >
              <Text
                style={{ color: typeColor.text }}
                className="text-[10px] font-bold uppercase"
              >
                {type}
              </Text>
            </View>
          );
        })}
      </View>
    </AnimatedPressable>
  );
}
