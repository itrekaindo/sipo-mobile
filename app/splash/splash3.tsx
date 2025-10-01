import Dots from "@/components/Dots";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, View } from "react-native";
import Button from "../../components/button";
import { Colors } from "../../constants/colors";
import { Fonts } from "../../constants/fonts";

export default function Splash3() {
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
				source={require("../../assets/images/memo.png")}
				style={{ width: 283, height: 283, marginBottom: 40 }}
				resizeMode="contain"
			/>

			{/* Judul */}
			<Text
				style={[
					Fonts.header1,
					{ color: Colors.navy, textAlign: "center", marginBottom: 10 },
				]}>
				Resmi dan Efisien
			</Text>

			{/* Subjudul */}
			<Text
				style={[
					Fonts.paragraphRegularLarge,
					{
						color: Colors.textSecondary,
						textAlign: "center",
						marginBottom: 40,
					},
				]}>
				Sahkan dokumen Anda tanpa ragu{"\n"}
				dengan tanda tangan digital yang{"\n"}
				terenkripsi dan terlindungi.
			</Text>

			<View style={{ position: "absolute", bottom: 100, alignSelf: "center" }}>
				<Dots
					total={4}
					activeIndex={2}
					color={Colors.navy}
					inactiveColor="rgba(30,65,120,0.2)"
				/>
			</View>

			{/* Tombol */}
			<Button
				title="Selanjutnya..."
				size="medium"
				variant="outline"
				uppercase={false}
				style={{ position: "absolute", bottom: 50, right: 20 }}
				onPress={() => router.push("/splash/splash4")}
			/>
		</View>
	);
}
