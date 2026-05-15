export function getPokemonOfTheDayId() {
  const today = new Date();
  const totalPokemon = 1350;

  const startOfYear = new Date(today.getFullYear(), 0, 0);
  const diff = today.getTime() - startOfYear.getTime();

  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));

  return ((dayOfYear - 1) % totalPokemon) + 1;
}
