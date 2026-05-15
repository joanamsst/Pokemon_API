import { Tabs } from "expo-router";
import { House, Search, Star } from "lucide-react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: "#fafafa" },
        tabBarActiveTintColor: "#16a34a",

        tabBarStyle: {
          height: 75,
          paddingTop: 10,
          paddingBottom: 8,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ size, focused }) => (
            <House size={size} color={focused ? "#16a34a" : "gray"} />
          ),
        }}
      />
      <Tabs.Screen
        name="pokedex"
        options={{
          title: "Pokédex",
          tabBarIcon: ({ size, focused }) => (
            <Search size={size} color={focused ? "#16a34a" : "gray"} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          tabBarIcon: ({ size, focused }) => (
            <Star size={size} color={focused ? "#16a34a" : "gray"} />
          ),
        }}
      />
    </Tabs>
  );
}
