import * as ImagePicker from "expo-image-picker";
import { Alert, Linking } from "react-native";

async function ensureCameraPermission() {
  const permission = await ImagePicker.requestCameraPermissionsAsync();

  if (!permission.granted) {
    Alert.alert(
      "Permissão da câmera",
      "O app precisa de acesso à câmera para continuar.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Abrir ajustes",
          onPress: () => Linking.openSettings(),
        },
      ],
    );
    return false;
  }

  return true;
}

async function ensureMediaPermission() {
  const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!permission.granted) {
    Alert.alert(
      "Permissão da galeria",
      "O app precisa de acesso às fotos para continuar.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Abrir ajustes",
          onPress: () => Linking.openSettings(),
        },
      ],
    );
    return false;
  }

  return true;
}

export async function pickImage() {
  const hasPermission = await ensureMediaPermission();

  if (!hasPermission) {
    return null;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ["images"],
    allowsEditing: true,
    quality: 0.8,
  });

  if (result.canceled || !result.assets?.length) {
    return null;
  }

  return result.assets[0].uri;
}

export async function takePhoto() {
  const hasPermission = await ensureCameraPermission();

  if (!hasPermission) {
    return null;
  }

  const result = await ImagePicker.launchCameraAsync({
    allowsEditing: true,
    quality: 0.8,
  });

  if (result.canceled || !result.assets?.length) {
    return null;
  }

  return result.assets[0].uri;
}
