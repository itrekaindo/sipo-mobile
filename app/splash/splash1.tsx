import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Text, View } from "react-native";
import Dots from "../../components/Dots";
import { Colors } from "../../constants/colors";
import { Fonts } from "../../constants/fonts";

export default function Splash1() {
	const router = useRouter();

	// Animasi logo
	const scaleAnim = useRef(new Animated.Value(0.5)).current;
	const opacityAnim = useRef(new Animated.Value(0)).current;

	// Animasi teks ketik
	const fullText = "Sistem Informasi Persuratan Online";
	const [displayedText, setDisplayedText] = useState("");

	useEffect(() => {
		// Animasi logo zoom + fade
		Animated.parallel([
			Animated.spring(scaleAnim, {
				toValue: 1,
				friction: 4,
				tension: 40,
				useNativeDriver: true,
			}),
			Animated.timing(opacityAnim, {
				toValue: 1,
				duration: 1500,
				useNativeDriver: true,
			}),
		]).start();

		// Efek mengetik teks
		let index = 0;
		const typingInterval = setInterval(() => {
			index++;
			setDisplayedText(fullText.slice(0, index));

			if (index === fullText.length) {
				clearInterval(typingInterval);
			}
		}, 80);

		// Redirect ke splash2
		const timer = setTimeout(() => {
			router.push("/splash/splash2");
		}, 4000);

		return () => {
			clearInterval(typingInterval);
			clearTimeout(timer);
		};
	}, [router, scaleAnim, opacityAnim]);

	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
				backgroundColor: Colors.white,
			}}>
			{/* Logo animasi */}
			<Animated.Image
				source={require("../../assets/images/logo-reka.png")}
				style={{
					width: 180,
					height: 180,
					marginBottom: 20,
					transform: [{ scale: scaleAnim }],
					opacity: opacityAnim,
				}}
				resizeMode="contain"
			/>
			{/* Teks animasi ketik */}
			<Text
				style={[Fonts.header6, { textAlign: "center", color: Colors.navy }]}>
				{displayedText}
			</Text>
			<View style={{ position: "absolute", bottom: 100, alignSelf: "center" }}>
				<Dots
					total={4}
					activeIndex={0}
					color={Colors.navy}
					inactiveColor="rgba(30,65,120,0.2)"
				/>
			</View>
			;
		</View>
	);
}
