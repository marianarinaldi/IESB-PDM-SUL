import React, { useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const CATEGORIAS = ["Alimentação", "Transporte", "Lazer", "Contas"];

function GerenciarDespesas({ onSalvarDespesa, onCancelar }) {
  const [data, setData] = useState(new Date());
  const [valor, setValor] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || data;
    setShowPicker(false);
    setData(currentDate);
  };

  const handleValorChange = (text) => {
    const normalizedText = text.replace(",", ".");
    if (/^\d*\.?\d{0,2}$/.test(normalizedText)) {
      setValor(normalizedText);
    }
  };

  const handleSubmit = () => {
    const valorNumerico = Number(valor);
    if (
      !descricao.trim() ||
      !valor.trim() ||
      !categoria ||
      Number.isNaN(valorNumerico)
    ) {
      Alert.alert(
        "Campos obrigatórios",
        "Preencha descrição, valor e categoria.",
      );
      return;
    }

    onSalvarDespesa({
      id: `${Date.now()}`,
      descricao: descricao.trim(),
      valor: valorNumerico,
      data,
      categoria,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={styles.input}
          maxLength={32}
          value={descricao}
          onChangeText={setDescricao}
          placeholder="Ex.: Mercado"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Valor da despesa</Text>
        <TextInput
          style={styles.input}
          keyboardType="decimal-pad"
          maxLength={10}
          value={valor}
          onChangeText={handleValorChange}
          placeholder="0.00"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Categoria</Text>
        <View style={styles.categoriasContainer}>
          {CATEGORIAS.map((item) => {
            const active = categoria === item;
            return (
              <Pressable
                key={item}
                onPress={() => setCategoria(item)}
                style={({ pressed }) => [
                  styles.categoriaBotao,
                  active && styles.categoriaBotaoAtivo,
                  pressed && styles.pressed,
                ]}
              >
                <Text
                  style={[
                    styles.categoriaTexto,
                    active && styles.categoriaTextoAtivo,
                  ]}
                >
                  {item}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Data da despesa</Text>
        <Pressable onPress={() => setShowPicker(true)} style={styles.input}>
          <Text>{data.toLocaleDateString("pt-BR")}</Text>
        </Pressable>
        {showPicker && (
          <DateTimePicker
            value={data}
            mode="date"
            display="default"
            onChange={onChange}
          />
        )}
      </View>

      <View style={styles.actionsContainer}>
        <Pressable style={styles.cancelButton} onPress={onCancelar}>
          <Text style={styles.actionText}>Cancelar</Text>
        </Pressable>
        <Pressable style={styles.saveButton} onPress={handleSubmit}>
          <Text style={styles.actionText}>Salvar</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 12,
  },
  label: {
    fontSize: 12,
    marginBottom: 4,
    color: "#3f3f3f",
    fontWeight: "600",
  },
  input: {
    minHeight: 44,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  categoriasContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  categoriaBotao: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#c3c8d4",
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  categoriaBotaoAtivo: {
    backgroundColor: "#3f51b5",
    borderColor: "#3f51b5",
  },
  categoriaTexto: {
    color: "#333",
    fontWeight: "600",
  },
  categoriaTextoAtivo: {
    color: "#fff",
  },
  pressed: {
    opacity: 0.75,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#b0b0b0",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButton: {
    flex: 1,
    backgroundColor: "#3f51b5",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  actionText: {
    color: "#fff",
    fontWeight: "700",
  },
});

export default GerenciarDespesas;
