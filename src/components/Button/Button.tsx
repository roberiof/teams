import React from "react";
import {
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TouchableOpacityProps
} from "react-native";

export interface ButtonProps extends TouchableOpacityProps {
  children: string;
  style?: StyleProp<ViewStyle>;
}

export default function Button({ children, style, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity
      className="py-4 px-6 w-full rounded-md text-center bg-green-700"
      style={style}
      {...rest}
    >
      <Text className="text-center text-white font-bold"> {children} </Text>
    </TouchableOpacity>
  );
}
