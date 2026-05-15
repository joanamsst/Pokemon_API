import { typeColors } from "@/src/constants/colors";
import { typeIcons } from "@/src/constants/icons";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
} from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type Props = {
  type: string;
};

export default function TypeButton({ type }: Props) {
  const colors = typeColors[type] ?? typeColors.normal;
  const Icon = typeIcons[type] ?? typeIcons.normal;

  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedPressable
      onPress={() =>
        router.push({
          pathname: "/pokedex",
          params: { type },
        })
      }
      onPressIn={() => {
        scale.value = 0.95;
        opacity.value = 0.7;
      }}
      onPressOut={() => {
        scale.value = 1;
        opacity.value = 1;
      }}
      style={animatedStyle}
      className="items-center"
    >
      <View
        className="h-12 w-12 items-center justify-center rounded-full shadow-sm"
        style={{ backgroundColor: colors.badge }}
      >
        <Icon size={20} color="#fff" strokeWidth={2.5} />
      </View>

      <Text className="mt-2 text-xs font-medium capitalize text-zinc-600">
        {type}
      </Text>
    </AnimatedPressable>
  );
}
