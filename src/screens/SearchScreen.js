import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { searchBooks } from "../api/openLibrary";
import BookCard from "../components/BookCard";
import colors from "../styles/colors";

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [inputError, setInputError] = useState("");
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  async function handleSearch() {
    const keyword = query.trim().toLowerCase();

    if (!keyword) {
      setInputError("Input pencarian tidak boleh kosong.");
      setBooks([]);
      setHasSearched(false);
      return;
    }

    if (keyword.length < 3) {
      setInputError("Kata kunci minimal 3 karakter.");
      setBooks([]);
      setHasSearched(false);
      return;
    }

    try {
      setInputError("");
      setApiError("");
      setLoading(true);
      setHasSearched(true);

      const data = await searchBooks(query);

      const filteredBooks = data.filter((book) =>
        book.title?.toLowerCase().includes(keyword)
      );

      setBooks(filteredBooks);
    } catch (error) {
      setApiError("Gagal mencari buku. Coba lagi nanti.");
      setBooks([]);
    } finally {
      setLoading(false);
    }
  }

  function renderEmptyState() {
    if (loading) {
      return null;
    }

    if (hasSearched && books.length === 0 && !apiError) {
      return (
        <View style={styles.emptyBox}>
          <Ionicons name="sad-outline" size={58} color={colors.primary} />
          <Text style={styles.emptyTitle}>Buku tidak ditemukan</Text>
          <Text style={styles.emptyText}>
            Judul buku tidak sesuai dengan kata kunci pencarian.
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.emptyBox}>
        <Ionicons name="search-outline" size={54} color={colors.primary} />
        <Text style={styles.emptyTitle}>Mulai cari buku</Text>
        <Text style={styles.emptyText}>
          Masukkan minimal 3 karakter untuk mencari buku.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Search Books</Text>
        <Text style={styles.subtitle}>Cari buku berdasarkan judul atau penulis</Text>
      </View>

      <View style={styles.searchBox}>
        <Ionicons name="search" size={22} color={colors.muted} />
        <TextInput
          style={styles.input}
          placeholder="Contoh: Harry Potter"
          value={query}
          onChangeText={(text) => {
            setQuery(text);
            setInputError("");
            setApiError("");
          }}
        />
      </View>

      {inputError ? <Text style={styles.error}>{inputError}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Ionicons name="sparkles" size={18} color="#fff" />
        <Text style={styles.buttonText}>Cari Buku</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator
          size="large"
          color={colors.primary}
          style={styles.loading}
        />
      ) : null}

      {apiError ? <Text style={styles.error}>{apiError}</Text> : null}

      <FlatList
        data={books}
        keyExtractor={(item, index) => item.key || index.toString()}
        renderItem={({ item }) => (
          <BookCard
            book={item}
            onPress={() => navigation.navigate("Detail", { book: item })}
          />
        )}
        contentContainerStyle={{ paddingBottom: 115 }}
        ListEmptyComponent={renderEmptyState}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    marginTop: 46,
    marginHorizontal: 20,
    marginBottom: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: "900",
    color: colors.text,
  },
  subtitle: {
    marginTop: 5,
    color: colors.muted,
    fontWeight: "700",
  },
  searchBox: {
    marginHorizontal: 18,
    backgroundColor: "#fff",
    borderRadius: 24,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    elevation: 4,
  },
  input: {
    flex: 1,
    padding: 16,
    fontSize: 15,
    fontWeight: "600",
    color: colors.text,
  },
  button: {
    marginHorizontal: 18,
    marginTop: 14,
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    elevation: 5,
  },
  buttonText: {
    marginLeft: 8,
    color: "#fff",
    fontWeight: "900",
    fontSize: 15,
  },
  loading: {
    marginTop: 25,
  },
  error: {
    color: colors.danger,
    marginHorizontal: 20,
    marginTop: 8,
    fontWeight: "700",
  },
  emptyBox: {
    margin: 24,
    padding: 32,
    backgroundColor: "#fff",
    borderRadius: 30,
    alignItems: "center",
    elevation: 4,
  },
  emptyTitle: {
    marginTop: 14,
    fontSize: 20,
    fontWeight: "900",
    color: colors.text,
  },
  emptyText: {
    marginTop: 8,
    color: colors.muted,
    textAlign: "center",
    lineHeight: 22,
    fontWeight: "600",
  },
});