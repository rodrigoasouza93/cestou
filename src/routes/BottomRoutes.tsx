import {
  createBottomTabNavigator,
  BottomTabScreenProps,
} from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";

import { Home } from "@/app/Home";
import { Calculator } from "@/app/Calculator";

export type BottomRoutesList = {
  home: undefined;
  calculator: undefined;
};

export type BottomRoutesProps<T extends keyof BottomRoutesList> =
  BottomTabScreenProps<BottomRoutesList, T>;

const Tab = createBottomTabNavigator<BottomRoutesList>();

export function BottomRoutes() {
  return (
    <Tab.Navigator
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#79B44F",
        tabBarInactiveTintColor: "#999999",
        tabBarLabelPosition: "beside-icon",
      }}
    >
      <Tab.Screen
        name="home"
        component={Home}
        options={{
          tabBarLabel: "Lista",
          tabBarIcon: ({ color, size }) => (
            <Feather name="shopping-cart" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="calculator"
        component={Calculator}
        options={{
          tabBarLabel: "Calculadora",
          tabBarIcon: ({ color, size }) => (
            <Feather name="percent" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
