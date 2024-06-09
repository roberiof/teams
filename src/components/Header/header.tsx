import { View, Image, Pressable } from "react-native";
import logo from "@assets/main/logo.png";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import React from "react";

export interface HeaderProps {
  hasComeBackBtn?: boolean;
}

export default function Header({ hasComeBackBtn = false }: HeaderProps) {
  const router = useRouter();
  return (
    <View
      className={`flex-row items-center mt-14 ${hasComeBackBtn ? "justify-between" : "justify-center"} w-10/12`}
    >
      {hasComeBackBtn && (
        <Pressable onPress={() => router.back()}>
          <MaterialIcons name="arrow-back-ios" color={"white"} size={25} />
        </Pressable>
      )}
      <Image source={logo} className="w-[55px] h-[55px]" />
    </View>
  );
}
