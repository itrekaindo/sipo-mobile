import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BottomNav from "../../components/BottomNav";
import CustomModal from "../../components/filter-modal";
import { ThemedText } from "../../components/themed-text";
import { Colors } from "../../constants/colors";
import { Fonts } from "../../constants/fonts";
import { stylesIndex } from "../../constants/theme";
import { apiFetch } from "../../utils/api";
import { formatTanggalID } from "../../utils/date";

type Status = "pending" | "correction" | "approve" | "reject";

type Invitation = {
  id: number;
  title: string;
  date: string;
  status: Status;
};

const statusConfig: Record<
  Status,
  { icon: string; color: string; bg: string }
> = {
  pending: { icon: "clock-o", color: "#007bff", bg: "#e6f0ff" },
  correction: { icon: "pencil", color: "#f0ad4e", bg: "#fff7e6" },
  approve: { icon: "check-circle", color: "#28a745", bg: "#e6f9f0" },
  reject: { icon: "times-circle", color: "#dc3545", bg: "#ffe6e6" },
};
//const api = { getData }; // import your api functions
const UndanganScreen = () => {
  const router = useRouter();
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    async function fetchInvitations() {
      try {
        // adjust endpoint to match your backend, e.g. "/undangan"
        const raw = await apiFetch("/undangans");
        const data = Array.isArray(raw) ? raw : raw.data;

        // if API response shape is different, map it to match Invitation type
        const formatted: Invitation[] = data.map((item: any) => ({
          id: item.id_undangan, // adjust field names as per your API
          title: item.judul,
          date: formatTanggalID(item.tgl_rapat),
          status: item.status as Status,
        }));

        setInvitations(formatted);
      } catch (error) {
        console.error("Error fetching invitations:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchInvitations();
  }, []);
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text>Sedang memuat undangan...</Text>
      </View>
    );
  }

  return (
    <View style={stylesIndex.container}>
      {/* Header */}
      <View style={stylesIndex.header}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              flexDirection: "column",
              alignItems: "flex-start",
              flex: 1,
            }}
          >
            <ThemedText style={Fonts.header2}>Undangan Rapat</ThemedText>
            <ThemedText style={Fonts.header4}>
              Daftar undangan rapat yang diterima
            </ThemedText>
          </View>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <FontAwesome name="sliders" size={24} color={Colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <CustomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      >
        <Text style={{ fontSize: 16, marginBottom: 10 }}>
          This is a reusable modal 🎉
        </Text>
        <TouchableOpacity
          style={{ backgroundColor: "tomato", padding: 10, borderRadius: 8 }}
          onPress={() => setModalVisible(false)}
        >
          <Text style={{ color: "white", textAlign: "center" }}>Close</Text>
        </TouchableOpacity>
      </CustomModal>
      {/* Loading State */}
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#007bff"
          style={{ marginTop: 20 }}
        />
      ) : (
        <ScrollView contentContainerStyle={stylesIndex.list}>
          {invitations.map((item) => {
            const cfg = statusConfig[item.status];
            return (
              <View
                key={item.id}
                style={[stylesIndex.card, { backgroundColor: cfg.bg }]}
              >
                <View style={stylesIndex.row}>
                  <FontAwesome
                    name={cfg.icon as any}
                    size={24}
                    color={cfg.color}
                    style={stylesIndex.icon}
                  />
                  <View style={{ flex: 1 }}>
                    <ThemedText style={Fonts.paragraphMediumLarge}>
                      {item.title}
                    </ThemedText>
                    <ThemedText style={Fonts.paragraphRegularSmall}>
                      {item.date}
                    </ThemedText>
                  </View>
                  <TouchableOpacity
                    onPress={() =>
                      router.push(`/undangan/undangan-detail?id=${item.id}`)
                    }
                  >
                    <ThemedText
                      style={{ color: Colors.primary, fontWeight: "500" }}
                    >
                      View Details
                    </ThemedText>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </ScrollView>
      )}
      <BottomNav />
    </View>
  );
};
export default UndanganScreen;
const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    elevation: 2,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
  sub: {
    color: "#666",
    marginBottom: 4,
  },
});
