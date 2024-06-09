import { Text } from "react-native";
import { TextComponentType } from "@common/types/TextComponent";

export type TitleProps = TextComponentType;

export default function Title({ children, style }: TitleProps) {
  return (
    <Text className={"text-[24px] font-bold text-white"} style={style}>
      {children}
    </Text>
  );
}
