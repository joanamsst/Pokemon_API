import BrowseByType from "@/src/components/homePage/BrowseByType";
import FunFactCard from "@/src/components/homePage/FunFactCard";
import HomeHeader from "@/src/components/homePage/HomeHeader";
import PokemonOfTheDay from "@/src/components/homePage/PokemonOfTheDay";
import RecentlyViewed from "@/src/components/homePage/RecentlyViewed";
import { ScrollView, View } from "react-native";

export default function HomeScreen() {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View className="pt-20 pb-8 px-5 gap-8">
        <HomeHeader />
        <PokemonOfTheDay />
        <RecentlyViewed />
        <BrowseByType />
        <FunFactCard />
      </View>
    </ScrollView>
  );
}
