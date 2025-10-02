import Notification from "@/components/Notification";
import QuickStatCard from "@/components/QuickStatCard";
import { Colors } from "@/constants/colors";
import { Fonts } from "@/constants/fonts";
import { FontAwesome6 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";

export default function BerandaScreen() {
	const router = useRouter();

	const activities = [
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

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
			<ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
				{/* Header */}
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						paddingHorizontal: 16,
						paddingTop: 20,
						paddingBottom: 20,
					}}>
					<View style={{ flex: 1 }}>
						<Text
							style={[
								Fonts.paragraphMediumSmall,
								{ color: Colors.textSecondary },
							]}>
							Halo,
						</Text>
						<Text style={[Fonts.header1, { color: Colors.textPrimary }]}>
							Wira
						</Text>
					</View>
					<FontAwesome6
						name="bell"
						size={22}
						color={Colors.textPrimary}
						onPress={() => router.push("/notifikasi/notifikasi")}
					/>
				</View>

				{/* Quick stats */}
				<View
					style={{
						flexDirection: "row",
						gap: 12,
						paddingHorizontal: 16,
						marginTop: 16,
					}}>
					<QuickStatCard
						title="Memo"
						meta="12 Memo"
						icon="file-lines"
						accent={Colors.secondary}
						onPress={() => {}}
					/>
					<QuickStatCard
						title="Undangan"
						meta="10 Undangan"
						icon="calendar-days"
						accent={Colors.success}
						onPress={() => {}}
					/>
					<QuickStatCard
						title="Risalah"
						meta="13 Risalah"
						icon="scroll"
						accent={Colors.warning}
						onPress={() => {}}
					/>
				</View>

				{/* Section title */}
				<View style={{ paddingHorizontal: 16, marginTop: 18, marginBottom: 4 }}>
					<Text
						style={[Fonts.paragraphMediumSmall, { color: Colors.textPrimary }]}>
						Aktivitas
					</Text>
				</View>

				{/* Activities list */}
				<View>
					{activities.map((a, i) => (
						<Notification
							key={i}
							title={a.title}
							subtitle={a.subtitle}
							date={a.date}
							accent={a.accent}
							unread={true}
							onPress={() => {}}
						/>
					))}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}
