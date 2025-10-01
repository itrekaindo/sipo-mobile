import { apiFetch } from "@/utils/api";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
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
import { formatTanggalID } from "../../utils/date";

type Status = "pending" | "correction" | "approve" | "reject";

type Risalah = {
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
const RisalahScreen = () => {
  const router = useRouter();
  const [risalah, setRisalah] = useState<Risalah[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    async function fetchRisalah() {
      try {
        // adjust endpoint to match your backend, e.g. "/undangan"
        const raw = await apiFetch("/risalahs");
        const data = Array.isArray(raw) ? raw : raw.data;

        // if API response shape is different, map it to match Invitation type
        const formatted: Risalah[] = data.map((item: any) => ({
          id: item.id_undangan, // adjust field names as per your API
          title: item.judul,
          date: formatTanggalID(item.tgl_rapat),
          status: item.status as Status,
        }));

        setRisalah(formatted);
      } catch (error) {
        Alert.alert("Error: Daftar Risalah Tidak Ditemukan :" + error);
      } finally {
        setLoading(false);
      }
    }

    fetchRisalah();
  }, []);

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
            <ThemedText style={Fonts.header2}>Risalah Rapat</ThemedText>
            <ThemedText style={Fonts.header4}>
              Daftar risalah rapat yang diterima
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
          {risalah.map((item) => {
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
                      router.push(`/risalah/risalah-detail?id=${item.id}`)
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

export default RisalahScreen;
