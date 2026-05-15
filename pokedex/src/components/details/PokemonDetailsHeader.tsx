import { typeColors } from "@/src/constants/colors";
import { typeIcons } from "@/src/constants/icons";
import { Image, Text, View } from "react-native";

export default function PokemonDetailsHeader({ pokemon }: any) {
  const imageUrl =
    pokemon.sprites.other["official-artwork"].front_default ??
    pokemon.sprites.front_default;

  const mainType = pokemon.types[0].type.name;
  const colors = typeColors[mainType] ?? typeColors.normal;

  return (
    <View className="rounded-3xl px-5 pt-14 pb-6 items-center overflow-hidden">
      <Text style={{ color: colors.text }} className="font-bold text-lg">
        #{String(pokemon.id).padStart(3, "0")}
      </Text>

      <Text className="mt-1 text-5xl font-extrabold capitalize text-zinc-900">
        {pokemon.name}
      </Text>

      <View className="mt-4 flex-row gap-2">
        {pokemon.types.map((item: any) => {
          const typeName = item.type.name;
          const typeColor = typeColors[typeName] ?? typeColors.normal;
          const Icon = typeIcons[typeName] ?? typeIcons.normal;

          return (
            <View
              key={typeName}
              className="flex-row items-center gap-2 rounded-full px-4 py-2 shadow-sm"
              style={{ backgroundColor: typeColor.badge }}
            >
              <Icon size={16} color="#fff" strokeWidth={2.5} />

              <Text className="text-sm font-bold uppercase text-white">
                {typeName}
              </Text>
            </View>
          );
        })}
      </View>

      <Image
        source={{ uri: imageUrl }}
        className="mt-6 h-72 w-72"
        resizeMode="contain"
      />
    </View>
  );
}
