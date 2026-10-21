import { Ionicons } from "@expo/vector-icons";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";

function formatDate(date) {
  return new Intl.DateTimeFormat("pt-BR").format(new Date(date));
}

function formatCurrency(amount) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(amount));
}

function DespesaItem({ expense, onPress, colors, isTwoColumnLayout = false }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [pressed && styles.pressed]}
    >
      <View
        style={[
          styles.card,
          isTwoColumnLayout ? styles.cardTwoColumn : null,
          {
            backgroundColor: colors.surface,
            borderColor: colors.border,
            shadowColor: colors.text,
          },
        ]}
      >
        <View style={styles.headerRow}>
          <View
            style={[
              styles.categoryChip,
              { backgroundColor: colors.primarySoft },
            ]}
          >
            <Text style={[styles.categoryText, { color: colors.primary }]}>
              {expense.category}
            </Text>
          </View>
          <Text style={[styles.dateText, { color: colors.textMuted }]}>
            {formatDate(expense.date)}
          </Text>
        </View>

        <Text
          style={[styles.description, { color: colors.text }]}
          numberOfLines={2}
        >
          {expense.description}
        </Text>

        <View style={styles.footerRow}>
          <View style={styles.amountRow}>
            <Ionicons name="card-outline" size={16} color={colors.primary} />
            <Text style={[styles.amount, { color: colors.text }]}>
              {formatCurrency(expense.amount)}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

export default DespesaItem;

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    ...Platform.select({
      ios: {
        shadowOpacity: 0.15,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 6 },
      },
      android: {
        elevation: 4,
      },
      default: {},
    }),
  },
  cardTwoColumn: {
    flex: 1,
    marginHorizontal: 8,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  categoryChip: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: "700",
  },
  dateText: {
    fontSize: 12,
    fontWeight: "500",
  },
  description: {
    fontSize: 17,
    fontWeight: "700",
    lineHeight: 22,
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 14,
  },
  amountRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  amount: {
    fontSize: 16,
    fontWeight: "800",
  },
  pressed: {
    opacity: 0.82,
  },
});
