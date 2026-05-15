import { createContext } from "react";

export type FavoritePokemon = {
  id: number;
  name: string;
  image: string;
  types: string[];
};

export type FavoritesContextType = {
  favorites: FavoritePokemon[];
  addFavorite: (pokemon: FavoritePokemon) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
  toggleFavorite: (pokemon: FavoritePokemon) => void;
};

export const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);
