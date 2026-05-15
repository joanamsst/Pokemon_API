export const pokemonTypes = [
  "normal",
  "grass",
  "fire",
  "water",
  "electric",
  "bug",
  "flying",
  "rock",
  "poison",
  "ground",
  "ice",
  "fighting",
  "psychic",
  "ghost",
  "dragon",
  "dark",
  "steel",
  "fairy",
];

export type PokemonType = (typeof pokemonTypes)[number];
