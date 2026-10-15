import { useMemo } from "react";
import { StyleSheet, Text, View, useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import DespesaSaida from "../components/despesa/DespesaSaida";
import { getTheme } from "../constants/theme";
import { useExpenses } from "../store/expenses-context";

function EmptyState({ colors }) {
  return (
    <View style={styles.emptyContainer}>
      <View
        style={[styles.emptyIcon, { backgroundColor: colors.emptyBackground }]}
      >
        <Ionicons name="time-outline" size={36} color={colors.emptyIcon} />
      </View>
      <Text style={[styles.emptyTitle, { color: colors.text }]}>
        Sem despesas recentes
      </Text>
      <Text style={[styles.emptyMessage, { color: colors.textMuted }]}>
        Cadastre despesas para visualizar os últimos 7 dias.
      </Text>
    </View>
  );
}

function DespesasRecentes() {
  const navigation = useNavigation();
  const { expenses } = useExpenses();
  const scheme = useColorScheme();
  const colors = getTheme(scheme);

  const recentExpenses = useMemo(() => {
    const now = new Date();
    const sevenDaysAgo = new Date(now);
    sevenDaysAgo.setDate(now.getDate() - 7);

    return expenses.filter((expense) => {
      const expenseDate = new Date(expense.date);
      return expenseDate >= sevenDaysAgo && expenseDate <= now;
    });
  }, [expenses]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <DespesaSaida
        expenses={recentExpenses}
        colors={colors}
        title="Últimos 7 dias"
        onSelectExpense={(expenseId) =>
          navigation.navigate("GerenciarDespesa", { expenseId })
        }
        emptyComponent={<EmptyState colors={colors} />}
      />
    </View>
  );
}

export default DespesasRecentes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 28,
    paddingVertical: 40,
    gap: 10,
  },
  emptyIcon: {
    width: 76,
    height: 76,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "800",
    textAlign: "center",
  },
  emptyMessage: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
  },
});
