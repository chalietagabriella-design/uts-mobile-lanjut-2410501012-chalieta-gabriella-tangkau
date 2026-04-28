import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFavorites } from "../context/FavoriteContext";
import { getCoverUrl } from "../api/openLibrary";
import colors from "../styles/colors";

export default function FavoritesScreen({ navigation }) {
  const { favorites, removeFavorite } = useFavorites();

  function renderFavoriteCard(item) {
    const title = item.title || "Judul tidak tersedia";

    const author =
      item.author_name?.[0] ||
      item.authors?.[0]?.name ||
      "Penulis tidak diketahui";

    const coverId = item.cover_i || item.cover_id;
    const coverUrl = getCoverUrl(coverId);

    return (
      <View style={styles.card}>
        <TouchableOpacity
          style={styles.bookArea}
          onPress={() => navigation.navigate("Detail", { book: item })}
          activeOpacity={0.85}
        >
          {coverUrl ? (
            <Image source={{ uri: coverUrl }} style={styles.cover} />
          ) : (
            <View style={styles.noCover}>
              <Ionicons name="book-outline" size={34} color={colors.primary} />
            </View>
          )}

          <View style={styles.info}>
            <Text style={styles.bookTitle} numberOfLines={2}>
              {title}
            </Text>

            <Text style={styles.author} numberOfLines={1}>
              {author}
            </Text>

            <View style={styles.row}>
              <View style={styles.badge}>
                <Ionicons name="star" size={14} color={colors.accent} />
                <Text style={styles.badgeText}>Book</Text>
              </View>

              <Text style={styles.year}>
                {item.first_publish_year || "Unknown"}
              </Text>
            </View>
          </View>

          <View style={styles.arrow}>
            <Ionicons name="chevron-forward" size={24} color={colors.primary} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => removeFavorite(item.key)}
        >
          <Ionicons name="trash-outline" size={18} color="#fff" />
          <Text style={styles.removeText}>Hapus dari Favorit</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Favorite Books</Text>
        <Text style={styles.subtitle}>Koleksi buku yang kamu simpan</Text>
      </View>

      <FlatList
        data={favorites}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => renderFavoriteCard(item)}
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

  card: {
    marginHorizontal: 18,
    marginVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 30,
    padding: 14,
    elevation: 5,
  },
  bookArea: {
    flexDirection: "row",
    alignItems: "center",
  },
  cover: {
    width: 90,
    height: 125,
    borderRadius: 18,
    backgroundColor: colors.softBlue,
  },
  noCover: {
    width: 90,
    height: 125,
    borderRadius: 18,
    backgroundColor: colors.softBlue,
    justifyContent: "center",
    alignItems: "center",
  },
  info: {
    flex: 1,
    marginLeft: 16,
  },
  bookTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: colors.text,
    lineHeight: 26,
  },
  author: {
    marginTop: 8,
    color: colors.muted,
    fontSize: 15,
    fontWeight: "700",
  },
  row: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.softOrange,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 18,
  },
  badgeText: {
    marginLeft: 5,
    color: colors.accent,
    fontWeight: "900",
  },
  year: {
    marginLeft: 12,
    color: colors.muted,
    fontWeight: "900",
  },
  arrow: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.softBlue,
    justifyContent: "center",
    alignItems: "center",
  },

  removeButton: {
    marginTop: 14,
    backgroundColor: colors.danger,
    paddingVertical: 12,
    borderRadius: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  removeText: {
    marginLeft: 8,
    color: "#fff",
    fontWeight: "900",
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