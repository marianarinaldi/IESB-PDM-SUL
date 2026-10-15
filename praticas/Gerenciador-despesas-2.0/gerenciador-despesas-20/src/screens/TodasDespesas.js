import { useMemo, useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
  useColorScheme,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import DespesaSaida from "../components/despesa/DespesaSaida";
import useDebounce from "../hooks/useDebounce";
import { CATEGORIES, getTheme } from "../constants/theme";
import { useExpenses } from "../store/expenses-context";

function EmptyState({ colors, title, message }) {
  return (
    <View style={styles.emptyContainer}>
      <View
        style={[styles.emptyIcon, { backgroundColor: colors.emptyBackground }]}
      >
        <Ionicons name="receipt-outline" size={36} color={colors.emptyIcon} />
      </View>
      <Text style={[styles.emptyTitle, { color: colors.text }]}>{title}</Text>
      <Text style={[styles.emptyMessage, { color: colors.textMuted }]}>
        {message}
      </Text>
    </View>
  );
}

function TodasDespesas() {
  const navigation = useNavigation();
  const { expenses, clearExpenses } = useExpenses();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const scheme = useColorScheme();
  const colors = getTheme(scheme);
  const { width } = useWindowDimensions();
  const isTwoColumnLayout = width > 600;

  const debouncedSearchTerm = useDebounce(searchTerm, 250);

  const filteredExpenses = useMemo(() => {
    const normalizedSearch = debouncedSearchTerm.trim().toLowerCase();
    const normalizedCategory = selectedCategory;

    return expenses.filter((expense) => {
      const matchesSearch = normalizedSearch
        ? expense.description.toLowerCase().includes(normalizedSearch)
        : true;
      const matchesCategory =
        normalizedCategory === "Todas"
          ? true
          : expense.category === normalizedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [debouncedSearchTerm, expenses, selectedCategory]);

  const emptyTitle =
    searchTerm.trim() || selectedCategory !== "Todas"
      ? "Nenhuma despesa encontrada"
      : "Nenhuma despesa cadastrada";
  const emptyMessage =
    searchTerm.trim() || selectedCategory !== "Todas"
      ? "Tente ajustar a busca ou a categoria."
      : "Toque em + para adicionar uma nova despesa.";

  function handleClearAll() {
    Alert.alert("Limpar tudo", "Deseja apagar todas as despesas?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Limpar",
        style: "destructive",
        onPress: clearExpenses,
      },
    ]);
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View
        style={[
          styles.searchBox,
          { backgroundColor: colors.surface, borderColor: colors.border },
        ]}
      >
        <Ionicons name="search" size={18} color={colors.textMuted} />
        <TextInput
          value={searchTerm}
          onChangeText={setSearchTerm}
          placeholder="Buscar por descrição"
          placeholderTextColor={colors.placeholder}
          style={[styles.searchInput, { color: colors.text }]}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {searchTerm.length > 0 ? (
          <Pressable onPress={() => setSearchTerm("")}>
            <Ionicons name="close-circle" size={18} color={colors.textMuted} />
          </Pressable>
        ) : null}
      </View>

      <View style={styles.filtersRow}>
        <View style={styles.chipsRow}>
          {["Todas", ...CATEGORIES].map((category) => {
            const isActive = selectedCategory === category;

            return (
              <Pressable
                key={category}
                onPress={() => setSelectedCategory(category)}
                style={[
                  styles.chip,
                  {
                    borderColor: isActive ? colors.primary : colors.border,
                    backgroundColor: isActive ? colors.primary : colors.surface,
                  },
                ]}
              >
                <Text
                  style={{
                    color: isActive ? colors.primaryText : colors.text,
                    fontWeight: "700",
                  }}
                >
                  {category}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <Pressable
          onPress={handleClearAll}
          style={[
            styles.clearAllButton,
            { borderColor: colors.danger, backgroundColor: colors.surface },
          ]}
        >
          <Text style={{ color: colors.danger, fontWeight: "800" }}>
            Limpar tudo
          </Text>
        </Pressable>
      </View>

      <DespesaSaida
        expenses={filteredExpenses}
        colors={colors}
        title="Todas as despesas"
        onSelectExpense={(expenseId) =>
          navigation.navigate("GerenciarDespesa", { expenseId })
        }
        isTwoColumnLayout={isTwoColumnLayout}
        emptyComponent={
          <EmptyState
            colors={colors}
            title={emptyTitle}
            message={emptyMessage}
          />
        }
      />
    </View>
  );
}

export default TodasDespesas;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginHorizontal: 16,
    marginTop: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 16,
    borderWidth: 1,
  },
  filtersRow: {
    marginHorizontal: 16,
    marginTop: 12,
    gap: 12,
  },
  chipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  clearAllButton: {
    alignSelf: "flex-start",
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    paddingVertical: 0,
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
