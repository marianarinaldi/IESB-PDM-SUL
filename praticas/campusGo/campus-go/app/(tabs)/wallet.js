import { Alert, Pressable, Share, StyleSheet, Text, View } from "react-native";
import { useExpenses } from "../../store/expenses-context";

export default function WalletScreen() {
  const { expenses } = useExpenses();

  const total = expenses.reduce(
    (sum, item) => sum + Number(item.amount || 0),
    0,
  );

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Gastei R$ ${total.toFixed(2)} neste semestre.`,
      });
    } catch (error) {
      Alert.alert("Erro", "Não foi possível compartilhar o resumo.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bolso</Text>

      <View style={styles.summaryCard}>
        <Text style={styles.label}>Total acumulado</Text>
        <Text style={styles.total}>R$ {total.toFixed(2)}</Text>
      </View>

      <Pressable style={styles.shareButton} onPress={handleShare}>
        <Text style={styles.shareButtonText}>Compartilhar resumo</Text>
      </Pressable>

      <View style={styles.listCard}>
        {expenses.length === 0 ? (
          <Text style={styles.emptyText}>Nenhuma despesa registrada.</Text>
        ) : (
          expenses.map((expense) => (
            <View
              key={expense.id ?? `${expense.title}-${expense.date}`}
              style={styles.expenseRow}
            >
              <Text style={styles.expenseTitle}>{expense.title}</Text>
              <Text style={styles.expenseAmount}>
                R$ {Number(expense.amount).toFixed(2)}
              </Text>
            </View>
          ))
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eef6ff",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 16,
    color: "#0f172a",
  },
  summaryCard: {
    backgroundColor: "linear-gradient(135deg, #dbeafe, #bfdbfe)",
    borderRadius: 22,
    padding: 22,
    marginBottom: 16,
    shadowColor: "#2563eb",
    shadowOpacity: 0.18,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 5,
  },
  label: {
    color: "#1d4ed8",
    fontSize: 14,
    marginBottom: 8,
    fontWeight: "700",
  },
  total: {
    fontSize: 34,
    fontWeight: "800",
    color: "#0f172a",
  },
  shareButton: {
    backgroundColor: "#2563eb",
    padding: 15,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 18,
    shadowColor: "#2563eb",
    shadowOpacity: 0.22,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  shareButtonText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 16,
  },
  listCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 14,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  expenseRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
  expenseTitle: {
    fontSize: 15,
    color: "#0f172a",
    fontWeight: "600",
  },
  expenseAmount: {
    fontWeight: "800",
    color: "#1d4ed8",
  },
  emptyText: {
    color: "#64748b",
    fontSize: 15,
    textAlign: "center",
    marginVertical: 20,
    fontWeight: "600",
  },
});
