import { Text, FlatList, View } from "react-native";
import DespesaItem from "./DespesaItem";

function renderDespesaItem(itemData) {
  return (
    <View>
      <Text>{itemData.item.descricao}</Text>;
      <Text>{itemData.item.valor.toFixed(2)}</Text>;
    </View>
  );
}

function DespesaLista({ despesas }) {
  return (
    <FlatList
      data={despesas}
      renderItem={DespesaItem}
      keyExtractor={(item) => item.id}
    />
  );
}

export default DespesaLista;

