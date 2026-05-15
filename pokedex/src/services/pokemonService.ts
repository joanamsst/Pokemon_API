import { PokemonCardData, PokemonListItem } from "../types/pokemon";

const BASE_URL = "https://pokeapi.co/api/v2";

export async function getPokemonById(id: number) {
  const response = await fetch(`${BASE_URL}/pokemon/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch Pokémon");
  }

  return response.json();
}

export async function getPokedexPage(
  offset = 0,
  limit = 30,
): Promise<{
  results: PokemonCardData[];
  next: string | null;
  nextOffset: number;
}> {
  const response = await fetch(
    `${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch Pokémon page");
  }

  const data = await response.json();

  const pokemonDetails = await Promise.all(
    data.results.map(async (pokemon: PokemonListItem) => {
      const detailResponse = await fetch(pokemon.url);

      if (!detailResponse.ok) {
        throw new Error("Failed to fetch Pokémon detail");
      }

      const detail = await detailResponse.json();

      return {
        id: detail.id,
        name: detail.name,
        imageUrl:
          detail.sprites.other["official-artwork"].front_default ??
          detail.sprites.front_default,
        types: detail.types.map((item: any) => item.type.name),
      };
    }),
  );

  return {
    results: pokemonDetails,
    next: data.next,
    nextOffset: offset + limit,
  };
}

export async function getPokemonByIdOrName(idOrName: string) {
  const response = await fetch(`${BASE_URL}/pokemon/${idOrName}`);

  if (!response.ok) {
    throw new Error("Failed to fetch pokemon");
  }

  return response.json();
}

export async function getPokemonSpeciesByUrl(url: string) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch pokemon species");
  }

  return response.json();
}

export async function getEvolutionChainByUrl(url: string) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch evolution chain");
  }

  return response.json();
}
