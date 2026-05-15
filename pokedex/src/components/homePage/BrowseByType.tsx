import { pokemonTypes } from "@/src/constants/pokemonTypes";
import { ScrollView, Text, View } from "react-native";
import TypeButton from "./TypeButton";

export default function BrowseByType() {
  return (
    <View>
      <Text className="mb-3 text-xl font-bold text-zinc-800">
        Browse by type
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="gap-4 pr-5"
      >
        {pokemonTypes.map((type) => (
          <TypeButton key={type} type={type} />
        ))}
      </ScrollView>
    </View>
  );
}
