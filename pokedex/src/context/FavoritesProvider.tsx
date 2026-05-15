import AsyncStorage from "@react-native-async-storage/async-storage";
import { ReactNode, useContext, useEffect, useState } from "react";

import { FavoritePokemon, FavoritesContext } from "./FavoritesContext";

const STORAGE_KEY = "favorite-pokemons";

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<FavoritePokemon[]>([]);

  useEffect(() => {
    async function loadFavorites() {
      const storedFavorites = await AsyncStorage.getItem(STORAGE_KEY);

      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    }

    loadFavorites();
  }, []);

  async function saveFavorites(updatedFavorites: FavoritePokemon[]) {
    setFavorites(updatedFavorites);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedFavorites));
  }

  function toggleFavorite(pokemon: FavoritePokemon) {
    setFavorites((currentFavorites) => {
      const alreadyFavorite = currentFavorites.some(
        (item) => item.id === pokemon.id,
      );

      const updatedFavorites = alreadyFavorite
        ? currentFavorites.filter((item) => item.id !== pokemon.id)
        : [...currentFavorites, pokemon];

      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedFavorites));

      return updatedFavorites;
    });
  }

  function addFavorite(pokemon: FavoritePokemon) {
    setFavorites((currentFavorites) => {
      const updatedFavorites = [...currentFavorites, pokemon];

      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedFavorites));

      return updatedFavorites;
    });
  }

  function removeFavorite(id: number) {
    setFavorites((currentFavorites) => {
      const updatedFavorites = currentFavorites.filter(
        (pokemon) => pokemon.id !== id,
      );

      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedFavorites));

      return updatedFavorites;
    });
  }

  function isFavorite(id: number) {
    return favorites.some((pokemon) => pokemon.id === id);
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        toggleFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error("useFavorites must be used inside FavoritesProvider");
  }

  return context;
};
