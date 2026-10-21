import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import FadeIn from "../../components/FadeIn";
import { useNotices } from "../../hooks/useNotices";

export default function HomeScreen() {
  const { notices, isLoading, error, reload } = useNotices();

  const renderItem = ({ item }) => (
    <FadeIn style={styles.noticeCard}>
      <View style={styles.noticeBadge}>
        <Text style={styles.noticeBadgeText}>Aviso</Text>
      </View>
      <Text style={styles.noticeTitle}>{item.title}</Text>
      <Text style={styles.noticeBody}>{item.body}</Text>
    </FadeIn>
  );

  if (isLoading && notices.length === 0) {
    return (
      <View style={styles.centered}>
        <View style={styles.loaderCard}>
          <ActivityIndicator size="large" color="#2563eb" />
          <Text style={styles.loadingText}>Carregando avisos...</Text>
        </View>
      </View>
    );
  }

  if (error && notices.length === 0) {
    return (
      <View style={styles.centered}>
        <View style={styles.errorCard}>
          <Text style={styles.errorTitle}>Ops!</Text>
          <Text style={styles.errorText}>{error}</Text>
          <Pressable style={styles.retryButton} onPress={reload}>
            <Text style={styles.retryButtonText}>Tentar novamente</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerWrap}>
        <Text style={styles.header}>Mural de avisos</Text>
        <Text style={styles.headerHint}>Atualizações da campus</Text>
      </View>

      <FlatList
        data={notices}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        refreshing={isLoading}
        onRefresh={reload}
        contentContainerStyle={
          notices.length === 0 ? styles.emptyList : styles.list
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>
              Nenhum aviso disponível no momento.
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eef6ff",
    padding: 18,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eef6ff",
    padding: 20,
  },
  headerWrap: {
    marginBottom: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0f172a",
  },
  headerHint: {
    color: "#475569",
    marginTop: 4,
    fontSize: 14,
  },
  list: {
    paddingBottom: 18,
  },
  emptyList: {
    flexGrow: 1,
    justifyContent: "center",
  },
  loaderCard: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 28,
    minWidth: 220,
    alignItems: "center",
    shadowColor: "#2563eb",
    shadowOpacity: 0.12,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 5,
  },
  loadingText: {
    marginTop: 12,
    color: "#334155",
    fontSize: 16,
    fontWeight: "600",
  },
  errorCard: {
    backgroundColor: "#fff",
    padding: 22,
    borderRadius: 18,
    width: "88%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  errorTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#b91c1c",
    marginBottom: 8,
  },
  errorText: {
    color: "#475569",
    fontSize: 15,
    textAlign: "center",
    marginBottom: 16,
  },
  retryButton: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: "#2563eb",
  },
  retryButtonText: {
    color: "#fff",
    fontWeight: "700",
  },
  noticeCard: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    shadowColor: "#0f172a",
    shadowOpacity: 0.07,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 7 },
    elevation: 3,
    borderLeftWidth: 5,
    borderLeftColor: "#60a5fa",
  },
  noticeBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#dbeafe",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 10,
  },
  noticeBadgeText: {
    color: "#1d4ed8",
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  noticeTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 6,
  },
  noticeBody: {
    fontSize: 14,
    color: "#475569",
    lineHeight: 20,
  },
  emptyState: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 22,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  emptyText: {
    textAlign: "center",
    color: "#64748b",
    fontSize: 15,
    fontWeight: "600",
  },
});
