import { StatusBar } from "expo-status-bar";
import { Image, View } from "react-native";
import { styles } from "./styles";

export function Template({ children }: { children: React.ReactNode }) {
  return (
    <View style={styles.container}>
      <Image source={require("@/assets/logo.png")} style={styles.logo} />
      {children}
      <StatusBar style="auto" />
    </View>
  );
}
