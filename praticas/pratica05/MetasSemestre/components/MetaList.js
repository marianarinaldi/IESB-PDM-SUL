import React from "react";
import { FlatList, View, Text, Pressable, StyleSheet } from "react-native";

export default function MetaList({ metas, onDelete }) {
  return (
    <FlatList
      data={metas}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContent}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.metaText}>{item.texto}</Text>

          <Pressable
            onPress={() => onDelete(item.id)}
            style={({ pressed }) => [
              styles.deleteButton,
              pressed && styles.deleteButtonPressed,
            ]}
            android_ripple={{ color: "#fecaca" }}
          >
            <Text style={styles.deleteText}>Excluir</Text>
          </Pressable>
        </View>
      )}
      ListEmptyComponent={
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>Nenhuma meta cadastrada ainda.</Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 20,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  metaText: {
    flex: 1,
    color: "#0f172a",
    fontSize: 16,
    marginRight: 12,
  },
  deleteButton: {
    backgroundColor: "#ef4444",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  deleteButtonPressed: {
    backgroundColor: "#dc2626",
  },
  deleteText: {
    color: "#ffffff",
    fontWeight: "600",
  },
  emptyState: {
    paddingVertical: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    color: "#64748b",
    fontSize: 16,
  },
});
