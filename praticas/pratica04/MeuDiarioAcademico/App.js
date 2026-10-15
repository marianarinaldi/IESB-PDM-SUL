import React, { useState } from "react";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  FlatList,
  Switch,
} from "react-native";
import {
  APP_TITLE,
  INPUT_PLACEHOLDER,
  BUTTON_TEXT,
  LIST_TITLE,
} from "./labels";

const disciplinasFixas = ["Cálculo I", "Algoritmos", "Física", "PDM"];

export default function App() {
  const [disciplina, setDisciplina] = useState("");
  const [disciplinas, setDisciplinas] = useState(disciplinasFixas);
  const [mostrarApenasObrigatorias, setMostrarApenasObrigatorias] =
    useState(false);

  const adicionarDisciplina = () => {
    if (!disciplina.trim()) return;

    setDisciplinas((prev) => [disciplina.trim(), ...prev]);
    setDisciplina("");
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>{APP_TITLE}</Text>

        {/*
          justifyContent foi usado para separar visualmente o input do botão
          e alignItems para centralizar os itens verticalmente dentro da linha.
        */}
        <View style={styles.row}>
          <TextInput
            style={styles.input}
            placeholder={INPUT_PLACEHOLDER}
            value={disciplina}
            onChangeText={setDisciplina}
          />

          <Pressable
            onPress={adicionarDisciplina}
            style={({ pressed }) => [
              styles.addButton,
              pressed && styles.addButtonPressed,
            ]}
          >
            <Text style={styles.addButtonText}>{BUTTON_TEXT}</Text>
          </Pressable>
        </View>

        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Mostrar apenas obrigatórias</Text>
          <Switch
            value={mostrarApenasObrigatorias}
            onValueChange={setMostrarApenasObrigatorias}
          />
        </View>

        <Text style={styles.listTitle}>{LIST_TITLE}</Text>

        <FlatList
          data={disciplinas}
          keyExtractor={(item, index) => `${item}-${index}`}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.itemText}>{item}</Text>
            </View>
          )}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#c7d2fe",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#fff",
    marginRight: 10,
  },
  addButton: {
    width: "28%",
    backgroundColor: "#4f46e5",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonPressed: {
    backgroundColor: "#3730a3",
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  switchLabel: {
    fontSize: 15,
    color: "#374151",
  },
  listTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 12,
  },
  item: {
    backgroundColor: "#fff",
    padding: 14,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  itemText: {
    fontSize: 16,
  },
});
