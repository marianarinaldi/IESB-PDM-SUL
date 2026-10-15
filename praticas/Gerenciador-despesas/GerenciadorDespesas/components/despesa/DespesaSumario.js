import { View, Text, StyleSheet } from "react-native";

function DespesaSumario({ despesas, periodo }) {
  const somaDespesas = despesas.reduce((total, despesa) => {
    return total + despesa.valor;
  }, 0);

  const valorEmDestaque = somaDespesas > 200;

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Sumário</Text>
      <Text style={styles.periodo}>{periodo}</Text>
      <Text style={[styles.valor, valorEmDestaque && styles.valorAlto]}>
        R$ {somaDespesas.toFixed(2)}
      </Text>
    </View>
  );
}

export default DespesaSumario;

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  titulo: {
    fontSize: 14,
    fontWeight: "700",
    color: "#4b5563",
    marginBottom: 4,
  },
  periodo: {
    fontSize: 13,
    color: "#6b7280",
    marginBottom: 8,
  },
  valor: {
    fontSize: 22,
    fontWeight: "800",
    color: "#111827",
  },
  valorAlto: {
    color: "#dc2626",
  },
});
