import { Pressable, Text } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";

type FilterProps = {
  type: string;
  isSelected: boolean;
  onPress: () => void;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function FilterBadge({
  type,
  isSelected,
  onPress,
}: FilterProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={() => {
        scale.value = withSpring(0.93);
      }}
      onPressOut={() => {
        scale.value = withSpring(1);
      }}
      style={animatedStyle}
      className={`h-8 items-center justify-center rounded-full px-4 shadow-sm ${
        isSelected ? "bg-green-600" : "bg-white"
      }`}
    >
      <Text
        className={`text-center text-sm font-bold capitalize ${
          isSelected ? "text-white" : "text-zinc-500"
        }`}
      >
        {type}
      </Text>
    </AnimatedPressable>
  );
}
