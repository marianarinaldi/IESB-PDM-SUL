import { FlatList, StyleSheet } from "react-native";
import DespesaItem from "./DespesaItem";

function DespesaLista({
  expenses,
  onSelectExpense,
  colors,
  ListHeaderComponent,
  ListEmptyComponent,
  isTwoColumnLayout = false,
}) {
  return (
    <FlatList
      data={expenses}
      keyExtractor={(item) => item.id}
      numColumns={isTwoColumnLayout ? 2 : 1}
      columnWrapperStyle={isTwoColumnLayout ? styles.columnWrapper : null}
      renderItem={({ item }) => (
        <DespesaItem
          expense={item}
          onPress={() => onSelectExpense(item.id)}
          colors={colors}
          isTwoColumnLayout={isTwoColumnLayout}
        />
      )}
      contentContainerStyle={[
        styles.content,
        expenses.length === 0 && styles.contentEmpty,
      ]}
      ListHeaderComponent={ListHeaderComponent}
      ListEmptyComponent={ListEmptyComponent}
      showsVerticalScrollIndicator={false}
    />
  );
}

export default DespesaLista;

const styles = StyleSheet.create({
  content: {
    paddingBottom: 28,
  },
  contentEmpty: {
    flexGrow: 1,
  },
  columnWrapper: {
    gap: 0,
    paddingHorizontal: 8,
  },
});
