import Notification from "@/components/Notification";
import { Colors } from "@/constants/colors";
import { Fonts } from "@/constants/fonts";
import { FontAwesome6 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NotifikasiScreen() {
	const router = useRouter();

	const unread = [
		{
			title: "Undangan Terkirim",
			subtitle: "Rapat Anggaran 2025",
			date: "Senin, 07-09-2025 Pukul 07.00",
			accent: Colors.success,
		},
		{
			title: "Memo Terkirim",
			subtitle: "Pengadaan Kursi QMSHE",
			date: "Senin, 07-09-2025 Pukul 07.00",
			accent: Colors.secondary,
		},
		{
			title: "Risalah Terkirim",
			subtitle: "Rapat Anggaran 2024",
			date: "Senin, 07-09-2025 Pukul 07.00",
			accent: Colors.warning,
		},
		{
			title: "Undangan Terkirim",
			subtitle: "Rapat Anggaran 2025",
			date: "Senin, 07-09-2025 Pukul 07.00",
			accent: Colors.success,
		},
	];

	const read = [
		{
			title: "Undangan Terkirim",
			subtitle: "Rapat Anggaran 2025",
			date: "Senin, 07-09-2025 Pukul 07.00",
			accent: Colors.success,
		},
		{
			title: "Memo Terkirim",
			subtitle: "Pengadaan Kursi QMSHE",
			date: "Senin, 07-09-2025 Pukul 07.00",
			accent: Colors.secondary,
		},
	];

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
			<ScrollView
				contentContainerStyle={{ paddingBottom: 24 }}
				showsVerticalScrollIndicator={false}>
				{/* Header dengan back + padding 10 */}
				<View
					style={{
						paddingHorizontal: 10,
						paddingTop: 8,
						paddingBottom: 12,
						flexDirection: "row",
						alignItems: "center",
						gap: 8,
					}}>
					<Pressable
						onPress={() => router.replace("/beranda/beranda")}
						hitSlop={10}
						style={{ padding: 8 }}
						accessibilityRole="button"
						accessibilityLabel="Kembali ke Beranda">
						<FontAwesome6
							name="arrow-left"
							size={20}
							color={Colors.textPrimary}
						/>
					</Pressable>

					<Text style={[Fonts.header3, { color: Colors.textPrimary }]}>
						Notifikasi
					</Text>
				</View>

				{/* Belum terbaca */}
				<View style={{ paddingHorizontal: 10, paddingVertical: 8 }}>
					<Text
						style={[Fonts.paragraphMediumSmall, { color: Colors.textPrimary }]}>
						Notifikasi Belum Terbaca
					</Text>
				</View>
				{unread.map((n, i) => (
					<Notification
						key={`u-${i}`}
						title={n.title}
						subtitle={n.subtitle}
						date={n.date}
						accent={n.accent}
						unread
						onPress={() => {}}
					/>
				))}

				{/* Terbaca */}
				<View style={{ paddingHorizontal: 10, paddingVertical: 12 }}>
					<Text
						style={[Fonts.paragraphMediumSmall, { color: Colors.textPrimary }]}>
						Notifikasi Terbaca
					</Text>
				</View>
				{read.map((n, i) => (
					<Notification
						key={`r-${i}`}
						title={n.title}
						subtitle={n.subtitle}
						date={n.date}
						accent={n.accent}
						unread={false}
						onPress={() => {}}
					/>
				))}
			</ScrollView>
		</SafeAreaView>
	);
}
