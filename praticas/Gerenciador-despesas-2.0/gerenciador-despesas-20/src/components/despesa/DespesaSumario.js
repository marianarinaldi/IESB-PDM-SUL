import { StyleSheet, Text, View } from "react-native";

function formatCurrency(amount) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(amount));
}

function DespesaSumario({ quantity, total, title, colors }) {
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.surface, borderColor: colors.border },
      ]}
    >
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      <View style={styles.summaryRow}>
        <View>
          <Text style={[styles.label, { color: colors.textMuted }]}>
            Quantidade
          </Text>
          <Text style={[styles.value, { color: colors.text }]}>{quantity}</Text>
        </View>
        <View style={styles.totalBlock}>
          <Text style={[styles.label, { color: colors.textMuted }]}>Total</Text>
          <Text style={[styles.totalValue, { color: colors.primary }]}>
            {formatCurrency(total)}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default DespesaSumario;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 12,
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 14,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    gap: 18,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  value: {
    fontSize: 20,
    fontWeight: "800",
  },
  totalBlock: {
    alignItems: "flex-end",
  },
  totalValue: {
    fontSize: 20,
    fontWeight: "800",
  },
});
