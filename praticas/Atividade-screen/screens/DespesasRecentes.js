import React from "react";
import { View, Text, StyleSheet } from "react-native";

const despesas = [
  { nome: "Aluguel", valor: "R$ 1.200,00", categoria: "Moradia" },
  { nome: "Supermercado", valor: "R$ 420,50", categoria: "Casa" },
  { nome: "Internet", valor: "R$ 89,90", categoria: "Serviços" },
];

export default function DespesasRecentes() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Despesas Recentes</Text>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Resumo do mês</Text>
        <Text style={styles.total}>R$ 1.710,40</Text>
        <Text style={styles.subtitle}>Últimas movimentações</Text>

        {despesas.map((item) => (
          <View key={item.nome} style={styles.itemRow}>
            <View>
              <Text style={styles.itemName}>{item.nome}</Text>
              <Text style={styles.itemCategory}>{item.categoria}</Text>
            </View>
            <Text style={styles.itemValue}>{item.valor}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f7fa",
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
  cardLabel: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 8,
  },
  total: {
    fontSize: 32,
    fontWeight: "700",
    color: "#2f7cf6",
    marginBottom: 18,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 12,
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },
  itemName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  itemCategory: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 2,
  },
  itemValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#ef4444",
  },
});
