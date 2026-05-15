import { useEffect } from "react";
import Animated, {
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming,
} from "react-native-reanimated";

export default function AnimatedGradientBackground({
  color,
}: {
  color: string;
}) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(withTiming(1, { duration: 5000 }), -1, true);
  }, []);

  const firstBlobStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(progress.value, [0, 1], [-40, 40]),
      },
      {
        translateY: interpolate(progress.value, [0, 1], [-20, 50]),
      },
      {
        scale: interpolate(progress.value, [0, 1], [1, 1.25]),
      },
    ],
  }));

  const secondBlobStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(progress.value, [0, 1], [50, -30]),
      },
      {
        translateY: interpolate(progress.value, [0, 1], [40, -20]),
      },
      {
        scale: interpolate(progress.value, [0, 1], [1.2, 0.9]),
      },
    ],
  }));

  return (
    <>
      <Animated.View
        style={[
          {
            position: "absolute",
            top: -80,
            left: -60,
            width: 220,
            height: 220,
            borderRadius: 999,
            backgroundColor: color,
            opacity: 0.25,
          },
          firstBlobStyle,
        ]}
      />

      <Animated.View
        style={[
          {
            position: "absolute",
            top: 120,
            right: -80,
            width: 260,
            height: 260,
            borderRadius: 999,
            backgroundColor: color,
            opacity: 0.18,
          },
          secondBlobStyle,
        ]}
      />
    </>
  );
}
