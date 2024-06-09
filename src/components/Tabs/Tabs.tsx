import { Dispatch, SetStateAction } from "react";
import { View, Text, Pressable } from "react-native";

interface TabsProps {
  activeTab: "TIME A" | "TIME B";
  setActiveTab: Dispatch<SetStateAction<"TIME A" | "TIME B">>;
}

export default function Tabs({ activeTab, setActiveTab }: TabsProps) {
  const tabs: Array<"TIME A" | "TIME B"> = ["TIME A", "TIME B"];

  return (
    <View className="flex-row w-full items-center justify-between">
      <View className="flex-row">
        {tabs.map((tab) => (
          <Pressable
            key={tab}
            onPress={() => setActiveTab(tab)}
            className={`rounded-md px-3 py-2 uppercase border-2 ${tab === activeTab ? " border-green-500 opacity-90" : "border-transparent opacity-80"}`}
          >
            <Text
              className={`font-bold ${tab === activeTab ? "text-white " : "text-white/90"}`}
            >
              {tab}
            </Text>
          </Pressable>
        ))}
      </View>
      <Text className="text-[14px] text-base-gray-200">{tabs.length}</Text>
    </View>
  );
}
