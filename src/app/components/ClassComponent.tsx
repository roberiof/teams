import React from "react";
import { useRouter } from "expo-router";
import { View, Text, Image, Pressable } from "react-native";
import peopleIcon from "@assets/main/icons/people.png";

interface ClassComponentProps {
  name: string;
}

export default function ClassComponent({ name }: ClassComponentProps) {
  const router = useRouter();
  return (
    <Pressable onPress={() => router.push(`/addTeammate/${name}`)}>
      <View
        key={name}
        className="flex-row w-full bg-base-gray-500  rounded-md p-8 flex items-center mb-3"
      >
        <Image source={peopleIcon} />
        <Text className="ml-8 text-[18px] text-base-gray-100">{name}</Text>
      </View>
    </Pressable>
  );
}
