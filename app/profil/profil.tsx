// app/profil/profil.tsx
import Button from "@/components/button";
import { TextField } from "@/components/FormControl";
import { Colors } from "@/constants/colors";
import { Fonts } from "@/constants/fonts";
import { FontAwesome6 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfilScreen() {
	const user = {
		name: "Andy Warhole",
		title: "SM Senior Manager",
		email: "smlog@gmail.com",
		firstName: "Andy",
		lastName: "Warhole",
		username: "@andywarhole",
		phone: "0895355776435",
	};
	const router = useRouter();
	const handleLogout = async () => {
		await AsyncStorage.removeItem("token");
		await AsyncStorage.removeItem("user");
		router.replace("/login"); // ganti navigation.replace
	};

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
			{/* Header navy melengkung */}
			<View
				style={{
					backgroundColor: Colors.navy,
					paddingTop: 28,
					paddingBottom: 32,
					borderBottomLeftRadius: 36,
					borderBottomRightRadius: 36,
					alignItems: "center",
				}}>
				{/* Avatar */}
				<View
					style={{
						width: 120,
						height: 120,
						borderRadius: 60,
						backgroundColor: "rgba(255,255,255,0.15)", // tetap transparan supaya kontras
						alignItems: "center",
						justifyContent: "center",
						marginBottom: 16,
					}}>
					<FontAwesome6 name="user" size={56} color={Colors.white} />
				</View>

				<Text
					style={[Fonts.header1, { color: Colors.white, textAlign: "center" }]}>
					{user.name}
				</Text>
				<Text
					style={[
						Fonts.paragraphRegularSmall,
						{
							color: Colors.white,
							opacity: 0.85,
							textAlign: "center",
							marginTop: 4,
						},
					]}>
					{user.title}
				</Text>
			</View>

			{/* Form */}
			<ScrollView
				contentContainerStyle={{
					paddingHorizontal: 20,
					paddingTop: 16,
					paddingBottom: 120, // supaya tidak ketutup bottom nav
					gap: 8,
				}}
				showsVerticalScrollIndicator={false}>
				{/* Semua label otomatis pakai warna dari komponenmu; 
            untuk konsistensi teks sekitar form pakai textPrimary/Secondary */}
				<TextField
					label="Email"
					placeholder="example@gmail.com"
					value={user.email}
					status="disabled"
				/>

				<TextField
					label="Nama Depan"
					placeholder="Nama depan"
					value={user.firstName}
					status="disabled"
				/>

				<TextField
					label="Nama Belakang"
					placeholder="Nama belakang"
					value={user.lastName}
					status="disabled"
				/>

				<TextField
					label="Nama Pengguna"
					placeholder="@username"
					value={user.username}
					status="disabled"
				/>

				<TextField
					label="Nomor Telepon"
					placeholder="08xxxxxxxxxx"
					value={user.phone}
					status="disabled"
				/>

				{/* Logout */}
				<View style={{ height: 8 }} />
				{/* <Button
					title="Logout"
					size="large"
					variant="solid"
					color={Colors.danger}
					onPress={() => {
						// TODO: handle logout
					}}
				/> */}
				<Button title="Logout" onPress={handleLogout} />
			</ScrollView>
		</SafeAreaView>
	);
}
