import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { pickImage } from "../../services/media";

const STORAGE_KEY = "@profile-photo";

export default function ProfileScreen() {
  const [photoUri, setPhotoUri] = useState(null);

  useEffect(() => {
    const loadPhoto = async () => {
      const savedUri = await AsyncStorage.getItem(STORAGE_KEY);
      setPhotoUri(savedUri);
    };

    loadPhoto();
  }, []);

  const handlePickPhoto = async () => {
    const nextUri = await pickImage();

    if (!nextUri) {
      return;
    }

    setPhotoUri(nextUri);
    await AsyncStorage.setItem(STORAGE_KEY, nextUri);
    Alert.alert("Foto atualizada", "Sua foto de perfil foi salva.");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>

      <View style={styles.card}>
        <Pressable onPress={handlePickPhoto}>
          <Image
            source={
              photoUri ? { uri: photoUri } : require("../../assets/icon.png")
            }
            style={styles.avatar}
          />
        </Pressable>

        <Text style={styles.name}>CampusGo</Text>
        <Text style={styles.subtitle}>Toque na imagem para trocar a foto.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eef6ff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 20,
    color: "#0f172a",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 22,
    alignItems: "center",
    shadowColor: "#0f172a",
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 4,
    borderColor: "#bfdbfe",
    backgroundColor: "#e2e8f0",
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: "800",
    color: "#0f172a",
  },
  subtitle: {
    color: "#475569",
    marginTop: 8,
    fontSize: 14,
    textAlign: "center",
  },
});
