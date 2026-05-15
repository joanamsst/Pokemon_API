import { Text, View } from "react-native";

const statLabels: Record<string, string> = {
  hp: "HP",
  attack: "Attack",
  defense: "Defense",
  "special-attack": "Sp. Attack",
  "special-defense": "Sp. Defense",
  speed: "Speed",
};

const statColors: Record<string, string> = {
  hp: "#ef4444",
  attack: "#f97316",
  defense: "#3b82f6",
  "special-attack": "#a855f7",
  "special-defense": "#22c55e",
  speed: "#eab308",
};

export default function PokemonBaseStats({ stats }: { stats: any[] }) {
  return (
    <View className="bg-white rounded-3xl p-5 mb-4 shadow-sm">
      <Text className="text-zinc-900 text-2xl font-extrabold mb-4">
        Base Stats
      </Text>

      {stats.map((item) => {
        const value = item.base_stat;
        const percentage = Math.min(value, 100);

        return (
          <View key={item.stat.name} className="flex-row items-center mb-3">
            <Text className="w-28 text-zinc-600 text-base">
              {statLabels[item.stat.name]}
            </Text>

            <View className="flex-1 h-3 bg-zinc-100 rounded-full overflow-hidden">
              <View
                className="h-full rounded-full"
                style={{
                  width: `${percentage}%`,
                  backgroundColor: statColors[item.stat.name] ?? "#22c55e",
                }}
              />
            </View>

            <Text className="w-10 text-right text-zinc-700 font-bold">
              {value}
            </Text>
          </View>
        );
      })}
    </View>
  );
}
