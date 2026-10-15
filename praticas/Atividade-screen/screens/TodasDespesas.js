import React from "react";
import { View, Text, StyleSheet } from "react-native";

const despesas = [
  { nome: "Mercado", valor: "R$ 480,00", data: "03/10" },
  { nome: "Combustível", valor: "R$ 220,00", data: "02/10" },
  { nome: "Academia", valor: "R$ 120,00", data: "30/09" },
  { nome: "Farmácia", valor: "R$ 75,00", data: "27/09" },
];

export default function TodasDespesas() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todas as Despesas</Text>

      <View style={styles.list}>
        {despesas.map((despesa) => (
          <View key={despesa.nome} style={styles.itemCard}>
            <View>
              <Text style={styles.itemName}>{despesa.nome}</Text>
              <Text style={styles.itemDate}>{despesa.data}</Text>
            </View>
            <Text style={styles.itemValue}>{despesa.valor}</Text>
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
    backgroundColor: "#eef6ff",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 20,
  },
  list: {
    gap: 12,
  },
  itemCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 14,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  itemName: {
    fontSize: 17,
    fontWeight: "600",
    color: "#111827",
  },
  itemDate: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 4,
  },
  itemValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#ef4444",
  },
});
