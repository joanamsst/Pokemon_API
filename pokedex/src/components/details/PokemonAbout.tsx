import { Text, View } from "react-native";

export default function PokemonAbout({ species }: { species: any }) {
  const description = species?.flavor_text_entries
    ?.find((entry: any) => entry.language.name === "en")
    ?.flavor_text.replace(/\f|\n/g, " ");

  return (
    <View className="bg-white rounded-3xl p-5 shadow-sm">
      <Text className="text-zinc-900 text-2xl font-extrabold mb-4">About</Text>

      <Text className="text-zinc-600 text-lg leading-7">{description}</Text>
    </View>
  );
}
