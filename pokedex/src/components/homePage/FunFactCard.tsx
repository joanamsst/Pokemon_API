import { funFacts } from "@/src/constants/funFacts";
import { Sparkles } from "lucide-react-native";
import { useMemo } from "react";
import { Text, View } from "react-native";

export default function FunFactCard() {
  const fact = useMemo(
    () => funFacts[Math.floor(Math.random() * funFacts.length)],
    [],
  );

  return (
    <View className="mt-2 rounded-3xl bg-green-50 p-5 shadow-sm">
      <View className="mb-3 flex-row items-center gap-2">
        <View className="h-8 w-8 items-center justify-center rounded-full bg-green-100">
          <Sparkles size={16} color="#16a34a" />
        </View>

        <Text className="text-base font-extrabold text-zinc-800">
          Did you know?
        </Text>
      </View>

      <Text className="text-sm leading-6 text-zinc-600">{fact}</Text>
    </View>
  );
}
