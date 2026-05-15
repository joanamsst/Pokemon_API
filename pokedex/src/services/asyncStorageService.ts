import AsyncStorage from "@react-native-async-storage/async-storage";
import { RecentlyViewedPokemon } from "../types/pokemon";

const RECENTLY_VIEWED_KEY = "@recently_viewed_pokemon";

export async function getRecentlyViewedPokemon() {
  const storedPokemon = await AsyncStorage.getItem(RECENTLY_VIEWED_KEY);

  if (!storedPokemon) {
    return [];
  }

  return JSON.parse(storedPokemon) as RecentlyViewedPokemon[];
}

export async function addRecentlyViewedPokemon(pokemon: RecentlyViewedPokemon) {
  const currentPokemon = await getRecentlyViewedPokemon();

  const filteredPokemon = currentPokemon.filter(
    (item) => item.id !== pokemon.id,
  );

  const updatedPokemon = [pokemon, ...filteredPokemon].slice(0, 10);

  await AsyncStorage.setItem(
    RECENTLY_VIEWED_KEY,
    JSON.stringify(updatedPokemon),
  );

  return updatedPokemon;
}

export async function clearRecentlyViewedPokemon() {
  await AsyncStorage.removeItem(RECENTLY_VIEWED_KEY);
}
