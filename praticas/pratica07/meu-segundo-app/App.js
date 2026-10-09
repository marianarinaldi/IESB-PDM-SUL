import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DespesasRecentes from "./screens/DespesasRecentes";
import TodasDespesas from "./screens/TodasDespesas";
import GerenciarDespesas from "./screens/GerenciarDespesas";
import { NavigationContainer } from "@react-navigation/native";
import IconButton from "./components/IconButton";

export default function App() {
  const Tab = createNativeStackNavigator();

  function BottonTabScreen() {
    const navigation = useNavigation();

    return (
      <Tab.Navigator
        screenOptions={{
          headerStyle: () => (
            <IconButton
              icon="add"
              size={24}
              onPress={() => {
                navigation.navigate("GerenciarDespesas");
              }}
            />
          ),
          headerTintColor: "white",
          tabBarStyle: { backgroundColor: "#3f51b5" },
          tabBarActiveTintColor: "white",
        }}
      >
        <Tab.Screen
          name="Despesas Recentes"
          component={DespesasRecentes}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="hourglass" color={color} size={size} />
            ),
            tabBarLabel: "Recentes",
            title: "Despesas Recentes",
            tabBarLabelStyle: { fontSize: 16 },
          }}
        />
        <Tab.Screen
          name="Todas Despesas"
          component={TodasDespesas}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="wallet-outline" color={color} size={size} />
            ),
            tabBarLabel: "Todas",
            title: "Todas as Despesas",
            tabBarLabelStyle: { fontSize: 12 },
          }}
        />
      </Tab.Navigator>
    );
  }

  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Despesas"
          component={BottonTabScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="GerenciarDespesas" component={GerenciarDespesas} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
