import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BookCard from "../components/BookCard";
import { getTrendingBooks } from "../api/openLibrary";
import colors from "../styles/colors";
import typography from "../styles/typography";

export default function HomeScreen({ navigation }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  async function fetchBooks() {
    try {
      setError("");
      const data = await getTrendingBooks();
      setBooks(data);
    } catch (err) {
      setError("Gagal memuat data buku. Periksa koneksi internet.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    fetchBooks();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchBooks();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Memuat katalog buku...</Text>
      </SafeAreaView>
    );
  }

  if (error && books.length === 0) {
    return (
      <SafeAreaView style={styles.center}>
        <View style={styles.errorBox}>
          <Ionicons name="wifi-outline" size={60} color={colors.danger} />
          <Text style={styles.errorTitle}>Oops, data gagal dimuat</Text>
          <Text style={styles.errorMessage}>{error}</Text>

          <TouchableOpacity style={styles.retryButton} onPress={fetchBooks}>
            <Text style={styles.retryText}>Coba Lagi</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={books}
        keyExtractor={(item, index) => item.key || index.toString()}
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <View>
                <Text style={styles.greeting}>Halo, Chalieta</Text>
                <Text style={styles.smallText}>
                  Welcome to your digital bookshelf
                </Text>
              </View>

              <View style={styles.headerIcon}>
                <Ionicons name="library" size={28} color="#fff" />
              </View>
            </View>

            <View style={styles.hero}>
              <View style={{ flex: 1 }}>
                <Text style={styles.heroTitle}>BookShelf</Text>
                <Text style={styles.heroSubtitle}>
                  Temukan buku trending, cari buku favoritmu, dan simpan ke
                  koleksi.
                </Text>

                <View style={styles.heroBadge}>
                  <Ionicons name="sparkles" size={16} color={colors.primary} />
                  <Text style={styles.heroBadgeText}>Open Library API</Text>
                </View>
              </View>

              <Ionicons name="book" size={62} color="#fff" />
            </View>

            <View style={styles.statsRow}>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>{books.length}</Text>
                <Text style={styles.statLabel}>Books</Text>
              </View>

              <View style={styles.statCard}>
                <Text style={styles.statNumber}>5</Text>
                <Text style={styles.statLabel}>Screens</Text>
              </View>

              <View style={styles.statCard}>
                <Text style={styles.statNumber}>API</Text>
                <Text style={styles.statLabel}>Online</Text>
              </View>
            </View>

            <Text style={styles.sectionTitle}>Trending Books</Text>

            {error ? <Text style={styles.error}>{error}</Text> : null}
          </>
        }
        renderItem={({ item }) => (
          <BookCard
            book={item}
            onPress={() => navigation.navigate("Detail", { book: item })}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{ paddingBottom: 115 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  center: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  loadingText: {
    marginTop: 12,
    color: colors.muted,
    fontWeight: "700",
  },
  header: {
    marginHorizontal: 20,
    marginTop: 40,
    marginBottom: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greeting: {
    ...typography.title,
    color: colors.text,
  },
  smallText: {
    marginTop: 4,
    color: colors.muted,
    fontWeight: "700",
  },
  headerIcon: {
    width: 56,
    height: 56,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  hero: {
    marginHorizontal: 18,
    padding: 24,
    borderRadius: 34,
    backgroundColor: colors.primary,
    flexDirection: "row",
    alignItems: "center",
    elevation: 8,
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: "900",
    color: "#fff",
  },
  heroSubtitle: {
    marginTop: 8,
    color: "#DBEAFE",
    lineHeight: 22,
    fontWeight: "600",
  },
  heroBadge: {
    marginTop: 18,
    backgroundColor: "#fff",
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 13,
    paddingVertical: 8,
    borderRadius: 20,
  },
  heroBadgeText: {
    marginLeft: 6,
    color: colors.primary,
    fontWeight: "900",
  },
  statsRow: {
    flexDirection: "row",
    marginHorizontal: 18,
    marginTop: 16,
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 22,
    alignItems: "center",
    elevation: 3,
  },
  statNumber: {
    fontSize: 19,
    fontWeight: "900",
    color: colors.primary,
  },
  statLabel: {
    marginTop: 4,
    color: colors.muted,
    fontSize: 12,
    fontWeight: "700",
  },
  sectionTitle: {
    marginHorizontal: 20,
    marginTop: 22,
    marginBottom: 8,
    fontSize: 22,
    fontWeight: "900",
    color: colors.text,
  },
  error: {
    color: colors.danger,
    marginHorizontal: 20,
    marginBottom: 10,
    fontWeight: "700",
  },
  errorBox: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 28,
    borderRadius: 28,
    alignItems: "center",
    elevation: 5,
  },
  errorTitle: {
    marginTop: 14,
    fontSize: 22,
    fontWeight: "900",
    color: colors.text,
    textAlign: "center",
  },
  errorMessage: {
    marginTop: 8,
    color: colors.muted,
    textAlign: "center",
    lineHeight: 22,
    fontWeight: "600",
  },
  retryButton: {
    marginTop: 20,
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 13,
    borderRadius: 18,
  },
  retryText: {
    color: "#fff",
    fontWeight: "900",
  },
});