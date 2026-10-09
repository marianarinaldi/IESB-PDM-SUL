import { Text, View, StyleSheet } from "react-native";
import DespesaSaida from "../components/DespesaSaida";

function TodasDespesas() {
  const DUMMY_DESPESAS = [
    {
      id: "1",
      descricao: "Aluguel",
      valor: 1200.0,
      data: new Date(2024, 5, 1),
    },
    {
      id: "2",
      descricao: "Supermercado",
      valor: 250.5,
      data: new Date(2024, 5, 3),
    },
    {
      id: "3",
      descricao: "Transporte",
      valor: 100.75,
      data: new Date(2024, 5, 5),
    },
    { id: "4", descricao: "Lazer", valor: 150.0, data: new Date(2024, 5, 7) },
    { id: "5", descricao: "Saúde", valor: 300.0, data: new Date(2024, 5, 10) },
    {
      id: "6",
      descricao: "Educação",
      valor: 200.0,
      data: new Date(2024, 5, 12),
    },
    { id: "7", descricao: "Roupas", valor: 180.0, data: new Date(2024, 5, 15) },
    {
      id: "8",
      descricao: "Restaurante",
      valor: 90.0,
      data: new Date(2024, 5, 18),
    },
    { id: "9", descricao: "Viagem", valor: 500.0, data: new Date(2024, 5, 20) },
    { id: "10", descricao: "Outros", valor: 75.0, data: new Date(2024, 5, 22) },
  ];
  return (
    <View style={styles.container}>
      <DespesaSaida despesas={DUMMY_DESPESAS} periodo={"Total"} />
    </View>
  );
}

export default TodasDespesas;
