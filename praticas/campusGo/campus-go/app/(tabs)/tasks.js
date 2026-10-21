import { Alert, Button, Pressable, StyleSheet, Text, View } from "react-native";
import { Link, router } from "expo-router";
import * as Haptics from "expo-haptics";
import { useState } from "react";
import { getCurrentPlace } from "../../services/location";
import { scheduleReminder } from "../../services/notifications";

export default function TasksScreen() {
  const [placeLabel, setPlaceLabel] = useState("Ainda não marcou presença.");

  const handleCheckIn = async () => {
    const place = await getCurrentPlace();

    if (!place) {
      Alert.alert(
        "Permissão de localização",
        "A permissão foi negada ou indisponível.",
      );
      return;
    }

    setPlaceLabel(place.label);
    Alert.alert("Check-in realizado", place.label);
  };

  const handleReminder = async () => {
    await scheduleReminder("Estude agora", 10);
    Alert.alert(
      "Lembrete agendado",
      "Você receberá um lembrete em 10 segundos.",
    );
  };

  const handleComplete = async () => {
    try {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (error) {
      console.warn("Haptics unavailable", error);
    }

    Alert.alert("Tarefa concluída", "Parabéns! Você concluiu esta tarefa.");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tarefas</Text>

      <View style={styles.card}>
        <Link href="/new-task" asChild>
          <Pressable style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Nova tarefa</Text>
          </Pressable>
        </Link>

        <Link href="/task/42" asChild>
          <Pressable style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Abrir tarefa 42</Text>
          </Pressable>
        </Link>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Ações rápidas</Text>
        <Button title="Estudei aqui" onPress={handleCheckIn} />
        <Text style={styles.placeLabel}>Local: {placeLabel}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Lembretes</Text>
        <Button title="Lembrar em 10 s" onPress={handleReminder} />
        <View style={styles.spacer} />
        <Button title="Concluir" onPress={handleComplete} />
      </View>

      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>Voltar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eef6ff",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 12,
    color: "#0f172a",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    shadowColor: "#0f172a",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#334155",
    marginBottom: 10,
  },
  primaryButton: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 10,
  },
  primaryButtonText: {
    color: "#fff",
    fontWeight: "700",
  },
  secondaryButton: {
    backgroundColor: "#e0f2fe",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#0f172a",
    fontWeight: "700",
  },
  placeLabel: {
    color: "#475569",
    fontSize: 15,
    marginTop: 12,
    marginBottom: 4,
    fontWeight: "600",
  },
  spacer: {
    height: 10,
  },
  backButton: {
    marginTop: 8,
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#0f172a",
    alignItems: "center",
  },
  backButtonText: {
    color: "#fff",
    fontWeight: "700",
  },
});
