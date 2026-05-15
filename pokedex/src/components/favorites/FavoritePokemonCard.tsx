import { typeColors } from "@/src/constants/colors";
import { FavoritePokemon } from "@/src/context/FavoritesContext";
import { router } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function FavoritePokemonCard({
  pokemon,
}: {
  pokemon: FavoritePokemon;
}) {
  const mainType = pokemon.types[0];
  const colors = typeColors[mainType] ?? typeColors.normal;

  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedPressable
      onPress={() => router.push(`/pokemon/${pokemon.id}`)}
      onPressIn={() => {
        withSpring((scale.value = 0.94));
      }}
      onPressOut={() => {
        withSpring((scale.value = 1));
      }}
      className="w-[48%] rounded-3xl p-4 shadow-sm"
      style={[{ backgroundColor: colors.bg }, animatedStyle]}
    >
      <Text style={{ color: colors.text }} className="font-semibold">
        #{String(pokemon.id).padStart(3, "0")}
      </Text>

      <Image
        source={{ uri: pokemon.image }}
        className="h-28 w-full"
        resizeMode="contain"
      />

      <Text className="mt-2 text-lg font-extrabold capitalize text-zinc-900">
        {pokemon.name}
      </Text>

      <View
        className="mt-2 self-start rounded-full px-2 py-1"
        style={{ backgroundColor: colors.badge }}
      >
        <Text className="text-xs font-bold uppercase text-white">
          {mainType}
        </Text>
      </View>
    </AnimatedPressable>
  );
}
