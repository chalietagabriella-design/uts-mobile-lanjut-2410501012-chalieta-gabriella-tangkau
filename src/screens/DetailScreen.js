import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getBookDetail, getCoverUrl } from "../api/openLibrary";
import { useFavorites } from "../context/FavoriteContext";
import colors from "../styles/colors";

export default function DetailScreen({ route }) {
  const { book } = route.params;

  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const bookKey = book.key;
  const favorite = isFavorite(bookKey);

  const title = detail?.title || book.title || "Judul tidak tersedia";

  const author =
    book.author_name?.[0] ||
    book.authors?.[0]?.name ||
    "Penulis tidak diketahui";

  const coverId = book.cover_i || book.cover_id;
  const coverUrl = getCoverUrl(coverId);

  useEffect(() => {
    async function fetchDetail() {
      try {
        setError("");
        const data = await getBookDetail(book.key);
        setDetail(data);
      } catch (err) {
        setError("Gagal memuat detail buku.");
      } finally {
        setLoading(false);
      }
    }

    fetchDetail();
  }, []);

  function getDescription() {
    if (!detail?.description) {
      return "Deskripsi tidak tersedia.";
    }

    if (typeof detail.description === "string") {
      return detail.description;
    }

    return detail.description.value || "Deskripsi tidak tersedia.";
  }

  function handleFavorite() {
    if (favorite) {
      removeFavorite(bookKey);
    } else {
      addFavorite({
        key: book.key,
        title,
        author_name: [author],
        cover_i: coverId,
        first_publish_year: book.first_publish_year,
        edition_count: book.edition_count,
        subject: book.subject,
      });
    }
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Memuat detail buku...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topSection}>
        {coverUrl ? (
          <Image source={{ uri: coverUrl }} style={styles.cover} />
        ) : (
          <View style={styles.noCover}>
            <Ionicons name="book-outline" size={52} color={colors.primary} />
            <Text>No Cover</Text>
          </View>
        )}

        <Text style={styles.title}>{title}</Text>
        <Text style={styles.author}>{author}</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.infoRow}>
          <View style={styles.infoBox}>
            <Ionicons name="calendar-outline" size={23} color={colors.primary} />
            <Text style={styles.infoLabel}>Tahun</Text>
            <Text style={styles.infoValue}>
              {book.first_publish_year || "-"}
            </Text>
          </View>

          <View style={styles.infoBox}>
            <Ionicons name="albums-outline" size={23} color={colors.primary} />
            <Text style={styles.infoLabel}>Edisi</Text>
            <Text style={styles.infoValue}>{book.edition_count || "-"}</Text>
          </View>
        </View>

        <Text style={styles.label}>Judul</Text>
        <Text style={styles.text}>{title}</Text>

        <Text style={styles.label}>Author</Text>
        <Text style={styles.text}>{author}</Text>

        <Text style={styles.label}>Subject</Text>
        <Text style={styles.text}>
          {book.subject?.slice(0, 5).join(", ") || "Tidak tersedia"}
        </Text>

        <Text style={styles.label}>Deskripsi</Text>
        <Text style={styles.description}>{getDescription()}</Text>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity
          style={[
            styles.button,
            favorite ? styles.removeButton : styles.addButton,
          ]}
          onPress={handleFavorite}
        >
          <Ionicons
            name={favorite ? "heart-dislike" : "heart"}
            size={20}
            color="#fff"
          />
          <Text style={styles.buttonText}>
            {favorite ? "Hapus dari Favorit" : "Tambah ke Favorit"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
  },
  loadingText: {
    marginTop: 12,
    color: colors.muted,
  },
  topSection: {
    backgroundColor: colors.primary,
    padding: 26,
    alignItems: "center",
    borderBottomLeftRadius: 38,
    borderBottomRightRadius: 38,
  },
  cover: {
    width: 155,
    height: 225,
    borderRadius: 20,
    backgroundColor: "#E5E7EB",
  },
  noCover: {
    width: 155,
    height: 225,
    borderRadius: 20,
    backgroundColor: colors.lightPurple,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "900",
    marginTop: 18,
    textAlign: "center",
  },
  author: {
    color: "#EDE9FE",
    marginTop: 8,
    fontSize: 15,
  },
  content: {
    padding: 20,
    paddingBottom: 45,
  },
  infoRow: {
    flexDirection: "row",
  },
  infoBox: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 22,
    alignItems: "center",
    elevation: 3,
    marginHorizontal: 5,
  },
  infoLabel: {
    marginTop: 6,
    color: colors.muted,
  },
  infoValue: {
    fontWeight: "900",
    color: colors.text,
    marginTop: 4,
  },
  label: {
    marginTop: 20,
    fontSize: 17,
    fontWeight: "900",
    color: colors.text,
  },
  text: {
    marginTop: 8,
    color: colors.muted,
    lineHeight: 22,
  },
  description: {
    marginTop: 8,
    color: colors.muted,
    lineHeight: 24,
    textAlign: "justify",
  },
  error: {
    marginTop: 12,
    color: colors.danger,
  },
  button: {
    marginTop: 26,
    padding: 16,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  addButton: {
    backgroundColor: colors.primary,
  },
  removeButton: {
    backgroundColor: colors.danger,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "900",
    fontSize: 15,
    marginLeft: 8,
  },
});