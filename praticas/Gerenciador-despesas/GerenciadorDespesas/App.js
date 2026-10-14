import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import DespesasRecentes from "./screens/DespesasRecentes";
import TodasDespesas from "./screens/TodasDespesas";
import GerenciarDespesas from "./screens/GerenciarDespesas";
import IconButton from "./components/IconButton";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const DESPESAS_INICIAIS = [
  {
    id: "1",
    descricao: "Aluguel",
    valor: 1200,
    data: new Date(2024, 5, 1),
    categoria: "Contas",
  },
  {
    id: "2",
    descricao: "Supermercado",
    valor: 250.5,
    data: new Date(2024, 5, 3),
    categoria: "Alimentação",
  },
  {
    id: "3",
    descricao: "Uber",
    valor: 45.9,
    data: new Date(2024, 5, 4),
    categoria: "Transporte",
  },
  {
    id: "4",
    descricao: "Cinema",
    valor: 60,
    data: new Date(2024, 5, 7),
    categoria: "Lazer",
  },
];

function BottonTabScreen({ despesas, onCreateExpense }) {
  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: "#3f51b5" },
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: "#3f51b5" },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "#cdd5ff",
        headerRight: () => (
          <IconButton
            icon="add"
            size={24}
            color="white"
            onPress={() =>
              navigation.getParent()?.navigate("GerenciarDespesas")
            }
          />
        ),
      })}
    >
      <Tab.Screen
        name="Despesas Recentes"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" color={color} size={size} />
          ),
          tabBarLabel: "Recentes",
          title: "Despesas Recentes",
        }}
      >
        {() => <DespesasRecentes despesas={despesas} />}
      </Tab.Screen>
      <Tab.Screen
        name="Todas Despesas"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="wallet-outline" color={color} size={size} />
          ),
          tabBarLabel: "Todas",
          title: "Todas as Despesas",
        }}
      >
        {() => <TodasDespesas despesas={despesas} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function App() {
  const [despesas, setDespesas] = useState(DESPESAS_INICIAIS);

  function adicionarDespesa(novaDespesa) {
    setDespesas((despesasAtuais) => [novaDespesa, ...despesasAtuais]);
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Despesas" options={{ headerShown: false }}>
          {() => <BottonTabScreen despesas={despesas} />}
        </Stack.Screen>
        <Stack.Screen
          name="GerenciarDespesas"
          options={{ title: "Nova despesa" }}
        >
          {({ navigation }) => (
            <GerenciarDespesas
              onSalvarDespesa={(despesa) => {
                adicionarDespesa(despesa);
                navigation.goBack();
              }}
              onCancelar={() => navigation.goBack()}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
