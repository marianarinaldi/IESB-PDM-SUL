import { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import DespesaSaida from "../components/despesa/DespesaSaida";

const CATEGORIAS = ["Todas", "Alimentação", "Transporte", "Lazer", "Contas"];

function TodasDespesas({ despesas }) {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todas");

  const despesasFiltradas = useMemo(() => {
    if (categoriaSelecionada === "Todas") {
      return despesas;
    }

    return despesas.filter(
      (despesa) => despesa.categoria === categoriaSelecionada,
    );
  }, [despesas, categoriaSelecionada]);

  return (
    <View style={styles.container}>
      <View style={styles.filtroContainer}>
        {CATEGORIAS.map((categoria) => {
          const active = categoriaSelecionada === categoria;
          return (
            <Pressable
              key={categoria}
              onPress={() => setCategoriaSelecionada(categoria)}
              style={({ pressed }) => [
                styles.filtroBotao,
                active && styles.filtroBotaoAtivo,
                pressed && styles.pressed,
              ]}
            >
              <Text
                style={[styles.filtroTexto, active && styles.filtroTextoAtivo]}
              >
                {categoria}
              </Text>
            </Pressable>
          );
        })}
      </View>
      <DespesaSaida
        despesas={despesasFiltradas}
        periodo={categoriaSelecionada}
      />
    </View>
  );
}

export default TodasDespesas;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  filtroContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  filtroBotao: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  filtroBotaoAtivo: {
    backgroundColor: "#3f51b5",
    borderColor: "#3f51b5",
  },
  filtroTexto: {
    color: "#374151",
    fontWeight: "600",
  },
  filtroTextoAtivo: {
    color: "#fff",
  },
  pressed: {
    opacity: 0.75,
  },
});
