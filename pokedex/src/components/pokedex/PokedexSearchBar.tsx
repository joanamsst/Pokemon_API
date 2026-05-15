import { Search } from "lucide-react-native";
import { TextInput, View } from "react-native";

type SearchProps = {
  search: string;
  onChangeSearch: (value: string) => void;
};

export default function PokedexSearchBar({
  search,
  onChangeSearch,
}: SearchProps) {
  return (
    <View className="mt-5 flex-row items-center rounded-2xl bg-white px-4 shadow-sm">
      <TextInput
        value={search}
        onChangeText={onChangeSearch}
        placeholder="Search Pokémon"
        placeholderTextColor="#9ca3af"
        className="flex-1 py-4 text-zinc-900"
      />
      <Search size={18} color="#71717a" />
    </View>
  );
}
