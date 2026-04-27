import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getCoverUrl } from "../api/openLibrary";
import colors from "../styles/colors";

export default function BookCard({ book, onPress }) {
  const title = book.title || "Judul tidak tersedia";

  const author =
    book.author_name?.[0] ||
    book.authors?.[0]?.name ||
    "Penulis tidak diketahui";

  const coverId = book.cover_i || book.cover_id;
  const coverUrl = getCoverUrl(coverId);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      {coverUrl ? (
        <Image source={{ uri: coverUrl }} style={styles.cover} />
      ) : (
        <View style={styles.noCover}>
          <Ionicons name="book-outline" size={32} color={colors.primary} />
        </View>
      )}

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>

        <Text style={styles.author} numberOfLines={1}>
          {author}
        </Text>

        <View style={styles.bottomRow}>
          <View style={styles.badge}>
            <Ionicons name="star" size={13} color={colors.accent} />
            <Text style={styles.badgeText}>Book</Text>
          </View>

          <Text style={styles.year}>{book.first_publish_year || "Unknown"}</Text>
        </View>
      </View>

      <View style={styles.arrow}>
        <Ionicons name="chevron-forward" size={20} color={colors.primary} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    marginHorizontal: 18,
    marginVertical: 9,
    padding: 13,
    borderRadius: 26,
    backgroundColor: colors.card,
    alignItems: "center",
    elevation: 5,
  },
  cover: {
    width: 78,
    height: 116,
    borderRadius: 18,
    backgroundColor: colors.softGray,
  },
  noCover: {
    width: 78,
    height: 116,
    borderRadius: 18,
    backgroundColor: colors.softBlue,
    justifyContent: "center",
    alignItems: "center",
  },
  info: {
    flex: 1,
    marginLeft: 14,
  },
  title: {
    fontSize: 16,
    fontWeight: "900",
    color: colors.text,
    lineHeight: 21,
  },
  author: {
    marginTop: 7,
    fontSize: 13,
    fontWeight: "600",
    color: colors.muted,
  },
  bottomRow: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  badge: {
    flexDirection: "row",
    backgroundColor: colors.softOrange,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 18,
    alignItems: "center",
  },
  badgeText: {
    marginLeft: 5,
    color: colors.accent,
    fontSize: 12,
    fontWeight: "800",
  },
  year: {
    marginLeft: 10,
    color: colors.muted,
    fontSize: 12,
    fontWeight: "700",
  },
  arrow: {
    width: 40,
    height: 40,
    borderRadius: 20, // ⬅️ bikin bulat sempurna
    backgroundColor: colors.softBlue,
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
});