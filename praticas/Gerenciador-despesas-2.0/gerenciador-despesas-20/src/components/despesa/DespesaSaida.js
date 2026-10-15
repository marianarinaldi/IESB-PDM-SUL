import { View } from "react-native";
import DespesaLista from "./DespesaLista";
import DespesaSumario from "./DespesaSumario";

function DespesaSaida({
  expenses,
  onSelectExpense,
  colors,
  title,
  emptyComponent,
  isTwoColumnLayout = false,
}) {
  const total = expenses.reduce(
    (sum, expense) => sum + Number(expense.amount),
    0,
  );

  return (
    <View style={{ flex: 1 }}>
      <DespesaSumario
        quantity={expenses.length}
        total={total}
        title={title}
        colors={colors}
      />
      <DespesaLista
        expenses={expenses}
        onSelectExpense={onSelectExpense}
        colors={colors}
        ListEmptyComponent={emptyComponent}
        isTwoColumnLayout={isTwoColumnLayout}
      />
    </View>
  );
}

export default DespesaSaida;
