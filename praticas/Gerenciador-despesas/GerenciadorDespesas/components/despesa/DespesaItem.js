import { View, Text, Pressable, StyleSheet } from "react-native";

function getDataFormatada(data) {
  const dia = `${data.getDate()}`.padStart(2, "0");
  const mes = `${data.getMonth() + 1}`.padStart(2, "0");
  const ano = data.getFullYear();
  return `${dia}/${mes}/${ano}`;
}

function DespesaItem({ item }) {
  return (
    <Pressable>
      <View style={styles.itemContainer}>
        <View style={styles.headerRow}>
          <View style={styles.categoriaTag}>
            <Text style={styles.categoriaTexto}>{item.categoria}</Text>
          </View>
          <Text style={styles.dataTexto}>{getDataFormatada(item.data)}</Text>
        </View>
        <Text style={styles.descricaoTexto}>{item.descricao}</Text>
        <Text style={styles.valorTexto}>R$ {item.valor.toFixed(2)}</Text>
      </View>
    </Pressable>
  );
}

export default DespesaItem;

const styles = StyleSheet.create({
  itemContainer: {
    padding: 12,
    marginVertical: 6,
    marginHorizontal: 10,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e4e7ef",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
    gap: 8,
  },
  categoriaTag: {
    backgroundColor: "#eceff7",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 999,
  },
  categoriaTexto: {
    color: "#3f51b5",
    fontWeight: "700",
    fontSize: 12,
  },
  dataTexto: {
    color: "#6b7280",
    fontSize: 12,
  },
  descricaoTexto: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 6,
  },
  valorTexto: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
  },
});
