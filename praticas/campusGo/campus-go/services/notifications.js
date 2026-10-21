import { Alert, Platform } from "react-native";

let Notifications = null;

try {
  Notifications = require("expo-notifications");

  if (Notifications?.setNotificationHandler) {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });
  }
} catch (error) {
  console.warn(
    "expo-notifications unavailable in this environment:",
    error.message,
  );
}

export async function ensureNotificationPermission() {
  if (!Notifications?.requestPermissionsAsync) {
    return false;
  }

  const { status } = await Notifications.requestPermissionsAsync();
  return status === "granted";
}

export async function scheduleReminder(title, seconds) {
  if (!Notifications?.scheduleNotificationAsync) {
    Alert.alert(
      "Notificações indisponíveis",
      "Este ambiente não suporta notificação local. Use um build de desenvolvimento ou teste em um aparelho compatível.",
    );
    return false;
  }

  const hasPermission = await ensureNotificationPermission();

  if (!hasPermission) {
    return false;
  }

  if (Platform.OS === "android" && Notifications.setNotificationChannelAsync) {
    await Notifications.setNotificationChannelAsync("campusgo-reminders", {
      name: "CampusGo lembretes",
      importance: Notifications.AndroidImportance.DEFAULT,
      sound: "default",
    });
  }

  await Notifications.scheduleNotificationAsync({
    content: {
      title: title || "CampusGo",
      body: "Chegou o momento de revisar sua tarefa.",
      sound: true,
    },
    trigger: {
      seconds,
    },
  });

  return true;
}
