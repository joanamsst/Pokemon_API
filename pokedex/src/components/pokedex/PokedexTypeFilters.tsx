import { pokemonTypes } from "@/src/constants/pokemonTypes";
import { FlatList } from "react-native";
import FilterBadge from "./PokedexFilterBadge";

type FilterProps = {
  selectedType: string;
  onSelectType: (type: string) => void;
  listRef: React.RefObject<FlatList<string> | null>;
};

export default function PokedexTypeFilters({
  selectedType,
  onSelectType,
  listRef,
}: FilterProps) {
  const typeFilters = ["all", ...pokemonTypes];

  return (
    <FlatList
      ref={listRef}
      horizontal
      data={typeFilters}
      keyExtractor={(item) => item}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        gap: 8,
        paddingRight: 20,
      }}
      className="mt-4 mb-4 pb-4"
      renderItem={({ item: type }) => (
        <FilterBadge
          type={type}
          isSelected={selectedType === type}
          onPress={() => onSelectType(type)}
        />
      )}
    />
  );
}
