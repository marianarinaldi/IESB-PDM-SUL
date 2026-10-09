import { View, Text } from "react-native";

function DespesaSumario({ despesas, periodo }) {
  const somaDespesas = despesas.reduce((total, despesa) => {
    return total + despesa.valor;
  }, 0);

  return (
    <View>
      <Text>Sumário</Text>
      <Text>{periodo}</Text>
      <Text>{somaDespesas.toFixed(2)}</Text>
    </View>
  );
}

export default DespesaSumario;
