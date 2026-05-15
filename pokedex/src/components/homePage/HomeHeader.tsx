import { clearRecentlyViewedPokemon } from "@/src/services/asyncStorageService";
import { Bell } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

export default function HomeHeader() {
  return (
    <View className="flex-row items-center justify-between">
      <Text className="font-bold text-3xl text-zinc-800">Welcome Trainer</Text>

      <Pressable
        onPress={async () => {
          await clearRecentlyViewedPokemon();
        }}
        className="h-10 w-10 items-center justify-center rounded-full shadow-sm bg-white"
      >
        <Bell size={20} color="#27272a" />
      </Pressable>
    </View>
  );
}
