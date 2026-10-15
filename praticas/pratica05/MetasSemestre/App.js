import React, { useEffect, useState } from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MetaInput from "./components/MetaInput";
import MetaList from "./components/MetaList";

const STORAGE_KEY = "@metas_semestre";

export default function App() {
  const [texto, setTexto] = useState("");
  const [metas, setMetas] = useState([]);

  useEffect(() => {
    const carregarMetas = async () => {
      try {
        const dadosSalvos = await AsyncStorage.getItem(STORAGE_KEY);

        if (dadosSalvos) {
          const metasSalvas = JSON.parse(dadosSalvos);
          setMetas(metasSalvas);
        }
      } catch (error) {
        Alert.alert("Erro", "Não foi possível carregar as metas salvas.");
      }
    };

    carregarMetas();
  }, []);

  useEffect(() => {
    const salvarMetas = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(metas));
      } catch (error) {
        Alert.alert("Erro", "Não foi possível salvar as metas.");
      }
    };

    salvarMetas();
  }, [metas]);

  const adicionarMeta = () => {
    const textoLimpo = texto.trim();

    if (!textoLimpo) {
      Alert.alert("Atenção", "Digite uma meta antes de adicionar.");
      return;
    }

    const novaMeta = {
      id: Date.now().toString(),
      texto: textoLimpo,
      criadaEm: new Date().toISOString(),
    };

    setMetas((prev) => [novaMeta, ...prev]);
    setTexto("");
  };

  const removerMeta = (id) => {
    setMetas((prev) => prev.filter((meta) => meta.id !== id));
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require("./assets/icon.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>MetasSemestre</Text>
        </View>

        <MetaInput
          value={texto}
          onChangeText={setTexto}
          onAdd={adicionarMeta}
        />

        <MetaList metas={metas} onDelete={removerMeta} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 44,
    height: 44,
    marginRight: 12,
    borderRadius: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#0f172a",
  },
});
