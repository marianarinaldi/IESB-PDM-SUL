import { Button, StyleSheet, Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

export default function TaskDetailScreen() {
  const { id } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tarefa número {id}</Text>
      <Text style={styles.text}>Detalhes da tarefa selecionada.</Text>
      <Button title="Voltar" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8fafc",
    padding: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    color: "#475569",
    marginBottom: 20,
  },
});
