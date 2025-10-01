import Dots from "@/components/Dots";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, View } from "react-native";
import Button from "../../components/button";
import { Colors } from "../../constants/colors";
import { Fonts } from "../../constants/fonts";

export default function Splash2() {
	const router = useRouter();

	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
				backgroundColor: Colors.white,
			}}>
			{/* Frame teks */}
			<View
				style={{
					alignItems: "center",
					marginBottom: 30,
					paddingHorizontal: 20,
				}}>
				<Text
					style={[Fonts.header1, { textAlign: "center", color: Colors.navy }]}>
					Selamat Datang di SIPO
				</Text>
				<Text
					style={[
						Fonts.paragraphRegularLarge,
						{ textAlign: "center", color: Colors.navy, marginTop: 10 },
					]}>
					Kelola memo, undangan, dan risalah Anda{"\n"}
					dengan mudah kapan saja dan dimana saja.
				</Text>
			</View>

			{/* Gambar */}
			<Image
				source={require("../../assets/images/welcome.png")}
				style={{ width: 283, height: 283, marginBottom: 40 }}
				resizeMode="contain"
			/>

			<View style={{ position: "absolute", bottom: 100, alignSelf: "center" }}>
				<Dots
					total={4}
					activeIndex={1}
					color={Colors.navy}
					inactiveColor="rgba(30,65,120,0.2)"
				/>
			</View>

			{/* Button pakai component */}
			<Button
				title="Selanjutnya..."
				size="medium"
				variant="outline"
				uppercase={false}
				style={{ position: "absolute", bottom: 50, right: 20 }}
				onPress={() => router.push("/splash/splash3")}
			/>
		</View>
	);
}
