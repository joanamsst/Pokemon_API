import { useFavorites } from "@/src/context/FavoritesProvider";
import { Star } from "lucide-react-native";
import { Pressable } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
} from "react-native-reanimated";

export default function FavoriteButton({ pokemon }: { pokemon: any }) {
  const { isFavorite, toggleFavorite } = useFavorites();

  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const image =
    pokemon.sprites.other["official-artwork"].front_default ??
    pokemon.sprites.front_default;

  const favoritePokemon = {
    id: pokemon.id,
    name: pokemon.name,
    image,
    types: pokemon.types.map((item: any) => item.type.name),
  };

  const active = isFavorite(pokemon.id);

  function handlePressButton() {
    if (!active) {
      scale.value = withSequence(withSpring(1.3), withSpring(1));
    }

    toggleFavorite(favoritePokemon);
  }

  return (
    <Pressable
      onPress={handlePressButton}
      className="bg-white rounded-full w-10 h-10 items-center justify-center shadow-sm"
    >
      <Animated.View style={animatedStyle}>
        <Star
          size={20}
          color={active ? "#F2D235" : "#27272a"}
          fill={active ? "#F2D235" : "none"}
        />
      </Animated.View>
    </Pressable>
  );
}
