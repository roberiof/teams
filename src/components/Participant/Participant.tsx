import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleProp,
  ViewStyle
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import person from "@assets/main/icons/person.png";

interface ParticipantProps {
  name: string;
  style: StyleProp<ViewStyle>;
  onRemove: () => void;
}

export default function Participant({
  name,
  onRemove,
  style
}: ParticipantProps) {
  return (
    <View
      className="bg-base-gray-500 flex flex-row items-center py-4 px-4 rounded-md justify-between"
      style={style}
    >
      <View className="flex-row">
        <Image source={person} />
        <Text className="ml-4 text-white"> {name} </Text>
      </View>
      <TouchableOpacity onPress={onRemove}>
        <Ionicons name="close" size={24} color="#F75A68" />
      </TouchableOpacity>
    </View>
  );
}
