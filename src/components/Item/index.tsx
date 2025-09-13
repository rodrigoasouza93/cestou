import { FilterStatus } from "@/types/FilterStatus";
import { styles } from "./styles";
import { Text, TouchableOpacity, View } from "react-native";
import { StatusIcon } from "../StatusIcon";
import { Feather } from "@expo/vector-icons";

type ItemData = {
  status: FilterStatus;
  description: string;
};

type Props = {
  data: ItemData;
  onStatus: () => void;
  onRemove: () => void;
};

export function Item({ data, onStatus, onRemove }: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.8} onPress={onStatus}>
        <StatusIcon status={data.status} />
      </TouchableOpacity>

      <Text style={styles.description}>{data.description}</Text>

      <TouchableOpacity activeOpacity={0.8} onPress={onRemove}>
        <Feather size={18} color="#EF4444" name="trash-2" />
      </TouchableOpacity>
    </View>
  );
}
