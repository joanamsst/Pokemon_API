export type PokemonListItem = {
  name: string;
  url: string;
};

export type PokemonCardData = {
  id: number;
  name: string;
  imageUrl: string;
  types: string[];
};

export type RecentlyViewedPokemon = {
  id: number;
  name: string;
  image: string;
};
