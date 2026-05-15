import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { Pressable } from "react-native";

export default function BackButton() {
  const router = useRouter();

  function handleBack() {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  }

  return (
    <Pressable
      onPress={handleBack}
      className="bg-white rounded-full w-10 h-10 items-center justify-center shadow-sm"
    >
      <ArrowLeft size={20} color={"#27272a"} />
    </Pressable>
  );
}
