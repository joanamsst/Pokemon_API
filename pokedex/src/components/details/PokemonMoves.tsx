import { Text, View } from "react-native";

export default function PokemonMoves({ moves }: { moves: any[] }) {
  const levelUpMoves = moves
    .map((item) => {
      const detail = item.version_group_details.find(
        (detail: any) =>
          detail.move_learn_method.name === "level-up" &&
          detail.level_learned_at > 0,
      );

      return detail
        ? {
            name: item.move.name.replace("-", " "),
            level: detail.level_learned_at,
          }
        : null;
    })
    .filter(Boolean)
    .sort((a: any, b: any) => a.level - b.level)
    .slice(0, 6);

  return (
    <View className="bg-white rounded-3xl p-5 mb-4 shadow-sm">
      <Text className="text-zinc-900 text-2xl font-extrabold mb-4">Moves</Text>

      {levelUpMoves.map((move: any) => (
        <View
          key={`${move.name}-${move.level}`}
          className="flex-row justify-between border-b border-zinc-100 py-3"
        >
          <Text className="text-zinc-800 text-lg capitalize">{move.name}</Text>

          <Text className="text-zinc-500 text-lg font-bold">
            Lv. {move.level}
          </Text>
        </View>
      ))}
    </View>
  );
}
