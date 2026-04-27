import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BookCard from "../components/BookCard";
import { useFavorites } from "../context/FavoriteContext";
import colors from "../styles/colors";

export default function FavoritesScreen({ navigation }) {
  const { favorites } = useFavorites();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Favorite Books</Text>
        <Text style={styles.subtitle}>Koleksi buku yang kamu simpan</Text>
      </View>

      <FlatList
        data={favorites}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <BookCard
            book={item}
            onPress={() => navigation.navigate("Detail", { book: item })}
          />
        )}
        contentContainerStyle={{ paddingBottom: 115 }}
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <View style={styles.emptyIcon}>
              <Ionicons name="heart-outline" size={58} color={colors.primary} />
            </View>
            <Text style={styles.emptyTitle}>Belum ada favorit</Text>
            <Text style={styles.emptyText}>
              Buka detail buku lalu tekan tombol tambah favorit.
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
    backgroundColor: colors.background,
  },
  header: {
    marginTop: 46,
    marginHorizontal: 20,
    marginBottom: 12,
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
  emptyBox: {
    margin: 24,
    padding: 32,
    backgroundColor: "#fff",
    borderRadius: 30,
    alignItems: "center",
    elevation: 5,
  },
  emptyIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.softBlue,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyTitle: {
    marginTop: 16,
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