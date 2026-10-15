import React from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";

export default function MetaInput({ value, onChangeText, onAdd }) {
  return (
    <View style={styles.row}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Digite sua meta de estudo"
        placeholderTextColor="#6b7280"
        style={styles.input}
        autoCapitalize="sentences"
      />

      <Pressable
        onPress={onAdd}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
        android_ripple={{ color: "#dbeafe" }}
      >
        <Text style={styles.buttonText}>Adicionar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: "#ffffff",
    color: "#0f172a",
    marginRight: 10,
  },
  button: {
    backgroundColor: "#2563eb",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
    minWidth: 110,
  },
  buttonPressed: {
    backgroundColor: "#1d4ed8",
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "700",
  },
});
