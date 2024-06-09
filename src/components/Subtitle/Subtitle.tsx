import { Text } from "react-native";
import { TextComponentType } from "@common/types/TextComponent";

export type SubTitleProps = TextComponentType;

export default function SubTitle({ children }: SubTitleProps) {
  return <Text className="text-base-gray-300">{children}</Text>;
}
