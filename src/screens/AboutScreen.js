import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../styles/colors";

export default function AboutScreen() {
  const techStack = [
    "React Native",
    "Expo",
    "React Navigation",
    "Fetch API",
    "Context API",
    "useReducer",
    "Open Library API",
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.wrapper}>
      <View style={styles.topBg}>
        <Image
          source={require("../../assets/profile.png")}
          style={styles.avatar}
        />

        <Text style={styles.name}>Chalieta Gabriella Tangkau</Text>
        <Text style={styles.nim}>2410501012</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.appTitle}>BookShelf</Text>
        <Text style={styles.appSubtitle}>Katalog Buku Digital</Text>

        <View style={styles.infoItem}>
          <Ionicons name="person" size={22} color={colors.primary} />
          <Text style={styles.infoText}>Nama: Chalieta Gabriella Tangkau</Text>
        </View>

        <View style={styles.infoItem}>
          <Ionicons name="card" size={22} color={colors.primary} />
          <Text style={styles.infoText}>NIM: 2410501012</Text>
        </View>

        <View style={styles.infoItem}>
          <Ionicons name="book" size={22} color={colors.primary} />
          <Text style={styles.infoText}>Tema C: BookShelf - Katalog Buku</Text>
        </View>

        <View style={styles.infoItem}>
          <Ionicons name="cloud" size={22} color={colors.primary} />
          <Text style={styles.infoText}>API: Open Library API</Text>
        </View>

        <View style={styles.infoItem}>
          <Ionicons name="phone-portrait" size={22} color={colors.primary} />
          <Text style={styles.infoText}>React Native + Expo</Text>
        </View>

        <View style={styles.techBox}>
          <Text style={styles.techTitle}>Tech Stack</Text>

          <View style={styles.techWrap}>
            {techStack.map((item, index) => (
              <View key={index} style={styles.techBadge}>
                <Text style={styles.techText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.descBox}>
          <Text style={styles.descTitle}>Tentang Aplikasi</Text>
          <Text style={styles.description}>
            BookShelf adalah aplikasi katalog buku yang menampilkan daftar buku
            trending, detail buku, pencarian buku, dan fitur favorit. Aplikasi
            ini dibuat dengan tampilan modern menggunakan React Native dan Expo.
          </Text>
        </View>

        <Text style={styles.credit}>
          Dibuat oleh Chalieta Gabriella Tangkau • 2410501012
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  wrapper: {
    paddingBottom: 120,
  },
  topBg: {
    backgroundColor: colors.primary,
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: "center",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  avatar: {
    width: 135,
    height: 135,
    borderRadius: 75,
    borderWidth: 5,
    borderColor: "#fff",
    backgroundColor: colors.softBlue,
  },
  name: {
    marginTop: 16,
    color: "#fff",
    fontSize: 22,
    fontWeight: "900",
    textAlign: "center",
  },
  nim: {
    marginTop: 6,
    color: "#EDE9FE",
    fontSize: 16,
    fontWeight: "800",
  },
  card: {
    margin: 20,
    marginTop: -20,
    backgroundColor: "#fff",
    borderRadius: 30,
    padding: 20,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
  },
  appTitle: {
    fontSize: 30,
    fontWeight: "900",
    color: colors.text,
    textAlign: "center",
  },
  appSubtitle: {
    marginTop: 5,
    marginBottom: 20,
    color: colors.muted,
    textAlign: "center",
    fontWeight: "700",
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.softBlue,
    padding: 15,
    borderRadius: 20,
    marginBottom: 10,
  },
  infoText: {
    flex: 1,
    marginLeft: 12,
    color: colors.text,
    fontWeight: "800",
    lineHeight: 22,
  },
  techBox: {
    marginTop: 14,
    padding: 18,
    backgroundColor: colors.background,
    borderRadius: 24,
  },
  techTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: colors.text,
    marginBottom: 14,
  },
  techWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  techBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    elevation: 2,
  },
  techText: {
    color: "#fff",
    fontWeight: "900",
    fontSize: 13,
  },
  descBox: {
    marginTop: 14,
    padding: 18,
    backgroundColor: colors.background,
    borderRadius: 22,
  },
  descTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: colors.text,
    marginBottom: 8,
  },
  description: {
    color: colors.muted,
    lineHeight: 24,
    textAlign: "justify",
    fontWeight: "600",
  },
  credit: {
    marginTop: 20,
    textAlign: "center",
    color: colors.primary,
    fontWeight: "900",
  },
});