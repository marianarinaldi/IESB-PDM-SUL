import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function GerenciarDespesa() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gerenciar Despesa</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Descrição</Text>
        <Text style={styles.value}>Pagamento de conta</Text>

        <Text style={styles.label}>Categoria</Text>
        <Text style={styles.value}>Casa</Text>

        <Text style={styles.label}>Valor</Text>
        <Text style={styles.value}>R$ 350,00</Text>

        <Text style={styles.label}>Status</Text>
        <Text style={styles.value}>Pendente</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9fafb",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  label: {
    fontSize: 13,
    color: "#6b7280",
    marginTop: 16,
    marginBottom: 4,
  },
  value: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
});
