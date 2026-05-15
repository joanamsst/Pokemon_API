import { ArrowRight } from "lucide-react-native";
import { Image, Text, View } from "react-native";

function getEvolutionList(chain: any) {
  const evolutions = [];

  let current = chain;

  while (current) {
    const evolutionDetails = current.evolution_details?.[0];

    evolutions.push({
      name: current.species.name,
      url: current.species.url,
      level: evolutionDetails?.min_level ?? null,
    });

    current = current.evolves_to?.[0];
  }

  return evolutions;
}

function getPokemonIdFromSpeciesUrl(url: string) {
  const parts = url.split("/").filter(Boolean);
  return parts[parts.length - 1];
}

export default function PokemonEvolution({
  evolutionChain,
}: {
  evolutionChain: any;
}) {
  const evolutions = getEvolutionList(evolutionChain.chain);

  return (
    <View className="bg-white rounded-3xl p-5 mb-4 shadow-sm">
      <Text className="text-zinc-900 text-2xl font-extrabold mb-4">
        Evolution
      </Text>

      <View className="flex-row items-start">
        {evolutions.map((pokemon, index) => {
          const pokemonId = getPokemonIdFromSpeciesUrl(pokemon.url);
          const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;

          return (
            <View key={pokemon.name} className="flex-row flex-1 items-start">
              <View className="flex-1 items-center">
                <View className="h-20 w-20 items-center justify-center rounded-full bg-zinc-100">
                  <Image
                    source={{ uri: imageUrl }}
                    className="h-16 w-16"
                    resizeMode="contain"
                  />
                </View>

                <Text className="mt-2 text-center text-sm capitalize text-zinc-600">
                  {pokemon.name}
                </Text>

                {pokemon.level && (
                  <View className="mt-1 rounded-full bg-green-100 px-3 py-1">
                    <Text className="text-xs font-bold text-green-600">
                      Lv. {pokemon.level}
                    </Text>
                  </View>
                )}
              </View>

              {index < evolutions.length - 1 && (
                <View className="h-20 w-6 items-center justify-center">
                  <ArrowRight size={22} color="#71717a" strokeWidth={2.2} />
                </View>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
}
