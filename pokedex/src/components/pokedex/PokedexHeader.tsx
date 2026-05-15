import { Text, View } from "react-native";
import HomeButton from "../ui/HomeButton";

export default function PokedexHeader() {
  return (
    <View className="flex-row items-center justify-between">
      <Text className="font-bold text-3xl text-zinc-800">Pokédex</Text>

      <HomeButton />
    </View>
  );
}
