import { Pressable, useColorScheme } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { ExpensesContextProvider } from "./store/expenses-context";
import { getTheme } from "./constants/theme";
import TodasDespesas from "./screens/TodasDespesas";
import DespesasRecentes from "./screens/DespesasRecentes";
import GerenciarDespesa from "./screens/GerenciarDespesa";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function ExpensesTabs() {
  const scheme = useColorScheme();
  const colors = getTheme(scheme);

  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: colors.primaryText,
        tabBarStyle: { backgroundColor: colors.surface },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        sceneContainerStyle: { backgroundColor: colors.background },
        headerRight: () => (
          <Pressable
            onPress={() => navigation.getParent()?.navigate("GerenciarDespesa")}
            style={({ pressed }) => pressed && { opacity: 0.7 }}
          >
            <Ionicons
              name="add-circle-outline"
              size={28}
              color={colors.primaryText}
            />
          </Pressable>
        ),
      })}
    >
      <Tab.Screen
        name="Recentes"
        component={DespesasRecentes}
        options={{
          title: "Despesas recentes",
          tabBarLabel: "Recentes",
        }}
      />
      <Tab.Screen
        name="Todas"
        component={TodasDespesas}
        options={{
          title: "Todas as despesas",
          tabBarLabel: "Todas",
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const scheme = useColorScheme();
  const colors = getTheme(scheme);

  return (
    <ExpensesContextProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: colors.primary },
            headerTintColor: colors.primaryText,
            contentStyle: { backgroundColor: colors.background },
          }}
        >
          <Stack.Screen
            name="ExpensesTabs"
            component={ExpensesTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="GerenciarDespesa"
            component={GerenciarDespesa}
            options={{ title: "Nova despesa" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ExpensesContextProvider>
  );
}
