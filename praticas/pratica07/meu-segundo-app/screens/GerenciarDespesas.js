import { Text, View, StyleSheet, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";

function GerenciarDespesas() {
  const [data, setData] = useState(new Date());
  const [valor, setValor] = useState("");
  const [descricao, setDescricao] = useState("");

  const [showPicker, setShowPicker] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || data;
    setShowPicker(false);
    setData(currentDate);
  };

  const handleValorChange = (text) => {
    const cleanedText = text.replace(",", ".");

    const match = cleanedText.match(/^\d*\.?\d{0,2}$/);
    if (!match) {
      setValor(cleanedText);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={styles.input}
          maxLength={20}
          value={descricao}
          onChangeText={setDescricao}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Valor da despesa</Text>
        <TextInput
          style={styles.input}
          keyboardType={"decimal-pad"}
          maxLength={10}
          value={valor}
          onChangeText={handleValorChange}
        />
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
    marginVertical: 16,
  },
  label: {
    fontSize: 12,
    marginBottom: 4,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 8,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
});

export default GerenciarDespesas;
