import { apiFetch } from "@/utils/api";
import { FontAwesome5 } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import BottomNav from "../../components/BottomNav";
import { ThemedText } from "../../components/themed-text";
import { Colors } from "../../constants/colors";
import { Fonts } from "../../constants/fonts";
import { formatTanggalID } from "../../utils/date";
import { postData, viewPDF } from "../api";

const COLOR = {
  bg: Colors.white,
  white: Colors.white,
  text: Colors.textPrimary,
  sub: Colors.textSecondary,
  border: Colors.lightGray,
  primary: Colors.primary,
  navy: Colors.navy,
  danger: Colors.danger,
  green50: "#ECFDF5",
  red50: "#FEF2F2",
  yellow50: "#FFFBEB",
  blue: Colors.primary,
  pdf: Colors.pdf,
};

type Status = "pending" | "correction" | "approve" | "reject";

const SectionChip = ({ title }: { title: string }) => (
  <View style={styles.sectionChip}>
    <ThemedText style={{ ...Fonts.header6, ...styles.sectionChipText }}>
      {title}
    </ThemedText>
  </View>
);
// di atas komponen UndanganDetail (setelah type Status)
const STATUS_STYLE: Record<
  Status,
  { label: string; bg: string; text: string }
> = {
  approve: { label: "Diterima", bg: "#D1FAE5", text: "#065F46" }, // green
  reject: { label: "Ditolak", bg: "#FEE2E2", text: "#991B1B" }, // red
  correction: { label: "Dikoreksi", bg: "#FEF3C7", text: "#92400E" }, // yellow
  pending: { label: "Menunggu", bg: "#E5E7EB", text: "#111827" }, // gray
};

const RadioRow = ({
  color,
  label,
  selected,
  onPress,
}: {
  color: "green" | "red" | "yellow";
  label: string;
  selected: boolean;
  onPress: () => void;
}) => {
  const bg =
    color === "green"
      ? COLOR.green50
      : color === "red"
      ? COLOR.red50
      : COLOR.yellow50;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.radioRow, { backgroundColor: bg }]}
    >
      <View style={[styles.radioOuter, selected && styles.radioOuterActive]}>
        {selected && <View style={styles.radioInner} />}
      </View>
      <ThemedText style={Fonts.paragraphMediumLarge}>{label}</ThemedText>
    </TouchableOpacity>
  );
};

const UndanganDetail: React.FC = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState<any>(null);

  const [status, setStatus] = useState<Status>("pending");
  const [catatan, setCatatan] = useState("");

  useEffect(() => {
    async function fetchDetail() {
      try {
        const raw = await apiFetch(`/undangans/${id}`);
        const data = raw?.data ?? raw;
        setDetail(data);
        if (data.status) {
          setStatus(data.status as Status);
        }
        Alert.alert("Detail undangan berhasil dimuat.");
      } catch (error) {
        Alert.alert("Error", "Gagal memuat detail undangan: " + error);
      } finally {
        setLoading(false);
      }
    }
    fetchDetail();
  }, [id]);

  async function handleSubmit() {
    try {
      const payload = { status, catatan, _method: "PUT" };
      await postData(`/undangans/${id}/update-status`, payload);
      Alert.alert("Berhasil", "Status undangan berhasil diperbarui", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } catch {
      Alert.alert("Error", "Gagal mengirim persetujuan");
    }
  }

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={COLOR.primary} />
      </View>
    );
  }

  if (!detail) {
    return (
      <View style={styles.loading}>
        <Text>Data undangan tidak ditemukan.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.white }}>
      <ScrollView style={{ flex: 1, backgroundColor: COLOR.bg }}>
        {/* Informasi detail */}
        <View style={styles.container}>
          <ThemedText
            style={[Fonts.header2, { color: COLOR.text, marginBottom: 8 }]}
          >
            {detail.judul}
          </ThemedText>

          {/* BADGE STATUS (statis ditampilkan, teks & warna mengikuti status) */}
          <View
            style={[
              styles.statusBadge,
              {
                backgroundColor:
                  STATUS_STYLE[detail.status as Status]?.bg || "#E5E7EB",
              },
            ]}
          >
            <Text
              style={[
                styles.statusBadgeText,
                {
                  color:
                    STATUS_STYLE[detail.status as Status]?.text || COLOR.text,
                },
              ]}
            >
              {STATUS_STYLE[detail.status as Status]?.label ?? "Status"}
            </Text>
          </View>

          <SectionChip title="Informasi Detail Surat" />
          <View style={styles.card}>
            <Field label="Nomor Surat" value={detail.nomor_undangan} />
            <Field label="Perihal" value={detail.judul} />
            <Field
              label="Hari, Tanggal"
              value={formatTanggalID(detail.tgl_rapat)}
            />
            <View style={{ flexDirection: "row", gap: 12 }}>
              <Field label="Waktu Mulai" value={detail.waktu_mulai} />
              <Field label="Waktu Selesai" value={detail.waktu_selesai} />
            </View>
            <Field label="Tempat Rapat" value={detail.tempat} />
            <Field label="Pengirim" value={detail.kode} />
            <Field label="Pembuat" value={detail.nama_pembuat} />
            <TouchableOpacity
              style={styles.pdfButton}
              onPress={() => viewPDF("undangan", detail.id_undangan)}
            >
              <FontAwesome5 name="file-pdf" color="white" />
              <Text style={styles.pdfButtonText}>Lihat PDF</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Daftar tujuan */}
        {Array.isArray(detail.tujuan_string) && (
          <View style={styles.container}>
            <SectionChip title="Daftar Tujuan" />
            <View style={styles.card}>
              {detail.tujuan_string.map((t: string, i: number) => (
                <View key={i} style={{ flexDirection: "row", marginBottom: 4 }}>
                  <ThemedText>{i + 1}.</ThemedText>
                  <ThemedText style={{ marginLeft: 6 }}>{t}</ThemedText>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Persetujuan hanya jika pending */}
        {detail.status === "pending" && (
          <View style={styles.container}>
            <SectionChip title="Persetujuan" />
            <View style={{ marginTop: 12, gap: 10 }}>
              <RadioRow
                color="green"
                label="Diterima"
                selected={status === "approve"}
                onPress={() => setStatus("approve")}
              />
              <RadioRow
                color="red"
                label="Ditolak"
                selected={status === "reject"}
                onPress={() => setStatus("reject")}
              />
              <RadioRow
                color="yellow"
                label="Dikoreksi"
                selected={status === "correction"}
                onPress={() => setStatus("correction")}
              />
            </View>
            {(status === "reject" || status === "correction") && (
              <View style={{ marginTop: 16 }}>
                <SectionChip title="Catatan" />
                <View style={styles.card}>
                  <TextInput
                    style={styles.textarea}
                    placeholder="Tuliskan catatan Anda..."
                    value={catatan}
                    onChangeText={setCatatan}
                    multiline
                  />
                </View>
              </View>
            )}
          </View>
        )}

        {/* Tampilkan catatan dari database jika status correction atau reject */}
        {(detail.status === "correction" || detail.status === "reject") && (
          <View style={styles.container}>
            <SectionChip title="Catatan" />
            <View style={styles.card}>
              <Field label="Catatan" value={detail.catatan} />
            </View>
          </View>
        )}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Actions hanya jika pending */}
      {detail.status === "pending" && (
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={styles.btnGhost}
            onPress={() => router.back()}
          >
            <ThemedText style={{ ...Fonts.header6, ...styles.btnGhostText }}>
              Batal
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.btnPrimary,
              status === "pending" ||
              ((status === "reject" || status === "correction") &&
                catatan.trim() === "")
                ? { backgroundColor: Colors.gray }
                : { backgroundColor: Colors.navy },
            ]}
            disabled={
              status === "pending" ||
              ((status === "reject" || status === "correction") &&
                catatan.trim() === "")
            }
            onPress={handleSubmit}
          >
            <ThemedText style={{ ...Fonts.header6, ...styles.btnPrimaryText }}>
              Kirim
            </ThemedText>
          </TouchableOpacity>
        </View>
      )}

      {/* Bottom nav */}
      <BottomNav />
    </SafeAreaView>
  );
};

const Field = ({ label, value }: { label: string; value?: string }) => (
  <View style={{ marginBottom: 10 }}>
    <ThemedText style={{ ...Fonts.paragraphMediumSmall, ...styles.muted }}>
      {label}
    </ThemedText>
    <View style={styles.fieldBox}>
      <ThemedText style={{ ...Fonts.paragraphMediumLarge, ...styles.value }}>
        {value}
      </ThemedText>
    </View>
  </View>
);

const styles = StyleSheet.create({
  loading: { flex: 1, alignItems: "center", justifyContent: "center" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLOR.border,
    gap: 8,
  },
  headerTitle: { flex: 1, fontSize: 16, fontWeight: "700", color: COLOR.text },

  statusBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 999,
    marginBottom: 12,
  },
  statusBadgeText: {
    fontWeight: "700",
    fontSize: 14,
  },

  badge: {
    backgroundColor: COLOR.blue,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 999,
  },
  badgeText: { color: COLOR.white, fontWeight: "600" },

  container: { padding: 16 },
  sectionChip: {
    backgroundColor: COLOR.navy,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
  },
  sectionChipText: { color: COLOR.white, fontWeight: "700" },

  card: {
    backgroundColor: COLOR.white,
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    borderWidth: 1,
    borderColor: COLOR.border,
  },
  fieldBox: {
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    padding: 12,
  },

  muted: { color: COLOR.sub, fontSize: 12 },
  value: { color: COLOR.text, fontSize: 14, fontWeight: "500" },

  pdfButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginTop: 12,
    backgroundColor: COLOR.pdf,
    borderRadius: 999,
    padding: 12,
  },
  pdfButtonText: { color: COLOR.white, fontWeight: "700" },

  radioRow: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    padding: 14,
    gap: 10,
  },
  radioOuter: {
    width: 18,
    height: 18,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: COLOR.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  radioOuterActive: { borderColor: COLOR.primary },
  radioInner: {
    width: 9,
    height: 9,
    borderRadius: 9,
    backgroundColor: COLOR.primary,
  },
  radioText: { fontSize: 14, color: COLOR.text },

  textarea: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: COLOR.border,
    borderRadius: 12,
    padding: 12,
    minHeight: 80,
    textAlignVertical: "top",
    backgroundColor: COLOR.white,
  },

  actionRow: {
    position: "absolute",
    bottom: 60,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
  },
  btnGhost: {
    borderWidth: 1,
    borderColor: COLOR.navy,
    borderRadius: 999,
    paddingVertical: 12,
    paddingHorizontal: 28,
    backgroundColor: COLOR.white,
  },
  btnGhostText: { color: COLOR.navy, fontWeight: "700" },
  btnPrimary: {
    backgroundColor: COLOR.navy,
    borderRadius: 999,
    paddingVertical: 12,
    paddingHorizontal: 28,
  },
  btnPrimaryText: { color: COLOR.white, fontWeight: "700" },

  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: COLOR.border,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: COLOR.white,
    paddingVertical: 10,
  },
});

export default UndanganDetail;
