import { useRouter } from "expo-router"; // pakai router
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Button, FlatList, StyleSheet, Text, View } from "react-native";
import { apiFetch } from "../../utils/api";

export default function MemoScreen() {
  const [memos, setMemos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchMemos = async () => {
      try {
        const res = await apiFetch("/memos");
        if (res?.data) {
          setMemos(res.data);
        }
      } catch (err) {
        console.error("Gagal ambil memos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMemos();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text>Sedang memuat memo...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={memos}
      keyExtractor={(item) => item.id_memo.toString()}
      contentContainerStyle={{ padding: 16 }}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.title}>{item.judul}</Text>
          <Text style={styles.sub}>Nomor: {item.nomor_memo}</Text>
          <Text>Status: {item.status}</Text>
          <Text>Pembuat: {item.nama_pembuat}</Text>
          <Text style={{ marginTop: 5 }}>Tujuan Memo:</Text>
            {item.tujuan_string
            .split(";")
            .map((tujuan: string, index: number) => (
                <Text  style={{ marginBottom: 5 }} key={index}>
                {index + 1}. {tujuan.trim()}
                </Text>
            ))}
          <Text>Tanggal: {new Date(item.created_at).toLocaleDateString()}</Text>
          <Text>Isi Memo: {item.isi_memo}</Text>
          <Text>Kode: {item.kode}</Text>
          
          <View style={{ marginTop: 10 }}>
            {item.lampiran_url ? (
              <Button
                title="📎 Lihat Lampiran"
                onPress={() => router.push(`/memo/lampiran?id_memo=${item.id_memo}`)}
                />
            ) : (
              <Text style={{ fontStyle: "italic", color: "gray" }}>
                Lampiran kosong
              </Text>
            )}
          </View>
        </View>
      )}
    />
  );
}

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
