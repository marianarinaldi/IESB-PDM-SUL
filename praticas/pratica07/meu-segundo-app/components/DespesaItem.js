import { View, Text, Pressable, StyleSheet } from "react-native";

function getDataFormatada(data) {
  const dia = data.getDate();
  const mes = data.getMonth() + 1;
  const ano = data.getFullYear();
  return `${dia}/${mes}/${ano}`;
}

function DespesaItem({ item }) {
  return (
    <Pressable>
      <View style={styles.itemContainer}>
        <View style={styles.itemText}>
          <Text>{getDataFormatada(item.data)}</Text>
        </View>
        <View style={styles.itemText}>
          <Text>{item.descricao}</Text>
        </View>
        <View style={styles.itemText}>
          <Text>{item.valor.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default DespesaItem;

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    padding: 5,
    marginVertical: 5,
    marginHorizontal: 5,
    backgroundColor: "lightgray",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 5,
  },
  itemText: {
    flex: 1,
    padding: 2,
    marginHorizontal: 2,
    marginVertical: 2,
    textAlign: "center",
    alignContent: "left",
  },
});
