import Dots from "@/components/Dots";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, View } from "react-native";
import Button from "../../components/button";
import { Colors } from "../../constants/colors";
import { Fonts } from "../../constants/fonts";

export default function Splash4() {
	const router = useRouter();

	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
				backgroundColor: Colors.white,
				paddingHorizontal: 20,
			}}>
			{/* Gambar */}
			<Image
				source={require("../../assets/images/rocket.png")}
				style={{ width: 283, height: 283, marginBottom: 40 }}
				resizeMode="contain"
			/>

			{/* Judul */}
			<Text
				style={[
					Fonts.header1,
					{
						fontSize: 32,
						color: Colors.navy,
						textAlign: "left",
						alignSelf: "flex-start",
						marginBottom: 10,
					},
				]}>
				Saatnya Bekerja {"\n"}Lebih Cepat
			</Text>

			{/* Subjudul */}
			<Text
				style={[
					Fonts.header6,
					{
						color: Colors.navy,
						textAlign: "left",
						alignSelf: "flex-start",
						marginBottom: 40,
						lineHeight: 22,
					},
				]}>
				Temukan Kemudahan {"\n"}Mengelola Dokumen Anda.
			</Text>

			<View style={{ position: "absolute", bottom: 100, alignSelf: "center" }}>
				<Dots
					total={4}
					activeIndex={3}
					color={Colors.navy}
					inactiveColor="rgba(30,65,120,0.2)"
				/>
			</View>

			{/* Tombol */}
			<Button
				title="Ayo Mulai"
				size="medium"
				variant="outline"
				uppercase={false}
				style={{ position: "absolute", bottom: 50, alignSelf: "center" }}
				onPress={() => router.replace("/login")}
			/>
		</View>
	);
}
