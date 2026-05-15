import { useRouter } from "expo-router";
import { House } from "lucide-react-native";
import { Pressable } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function HomeButton() {
  const router = useRouter();

  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  function handleGoHome() {
    router.replace("/");
  }

  return (
    <AnimatedPressable
      style={animatedStyle}
      onPress={handleGoHome}
      onPressIn={() => (scale.value = 0.9)}
      onPressOut={() => (scale.value = withSpring(1))}
      className="bg-white rounded-full w-10 h-10 items-center justify-center shadow-sm"
    >
      <House size={20} color="#27272a" />
    </AnimatedPressable>
  );
}
