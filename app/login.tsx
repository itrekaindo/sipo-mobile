import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
	// Alert,
	Animated,
	Image,
	Modal,
	// Platform,
	Text,
	TouchableOpacity,
	useWindowDimensions,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../components/button";
import { PasswordField, TextField } from "../components/FormControl";
import { Colors } from "../constants/colors";
import { Fonts } from "../constants/fonts";
import { apiFetch } from "../utils/api";

export default function LoginScreen() {
	const { width, height } = useWindowDimensions();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState<{ email?: string; password?: string }>(
		{}
	);
	const [loading, setLoading] = useState(false);
	const slideAnim = useRef(new Animated.Value(200)).current;
	const router = useRouter();
	const [alertVisible, setAlertVisible] = useState(false);
	const [alertMsg, setAlertMsg] = useState("");
	const showCustomAlert = (msg: string) => {
		setAlertMsg(msg);
		setAlertVisible(true);
	};

	useEffect(() => {
		Animated.timing(slideAnim, {
			toValue: 0,
			duration: 600,
			useNativeDriver: true,
		}).start();
	}, [slideAnim]);

	// const showAlert = (title: string, message: string) => {
	// 	if (Platform.OS === "web") {
	// 		alert(`${title}\n${message}`);
	// 	} else {
	// 		Alert.alert(title, message);
	// 	}
	// 	};

	const handleLogin = async () => {
		let newErrors: { email?: string; password?: string } = {};

		if (!email || !password) {
			showCustomAlert("Email dan Password harus diisi");
			return;
		}

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return;
		}

		setErrors({}); // reset errors kalau sudah valid
		setLoading(true);

		try {
			const res = await apiFetch("/login", {
				method: "POST",
				body: JSON.stringify({ email, password }),
			});

			if (res.status === "success") {
				await AsyncStorage.setItem("token", res.token);
				await AsyncStorage.setItem("user", JSON.stringify(res.user));

				showCustomAlert(`Login Berhasil\nSelamat datang ${res.user.fullname}`);
				router.replace("/beranda/beranda");
			} else {
				showCustomAlert("Login gagal\nEmail atau password salah");
			}
		} catch (err: any) {
			console.error(err);
			showCustomAlert("Email atau password salah");
		} finally {
			setLoading(false);
		}
	};

	function CustomAlert({ visible, onClose, title, message }: any) {
		return (
			<Modal transparent visible={visible} animationType="fade">
				<View
					style={{
						flex: 1,
						justifyContent: "center",
						alignItems: "center",
						backgroundColor: "rgba(0,0,0,0.5)",
					}}>
					<View
						style={{
							width: "80%",
							backgroundColor: "#fff",
							padding: 20,
							borderRadius: 12,
							alignItems: "center",
						}}>
						<Text
							style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
							{title}
						</Text>
						<Text
							style={{ fontSize: 14, textAlign: "center", marginBottom: 20 }}>
							{message}
						</Text>
						<TouchableOpacity
							style={{
								backgroundColor: "#1E40AF",
								paddingVertical: 10,
								paddingHorizontal: 20,
								borderRadius: 8,
							}}
							onPress={onClose}>
							<Text style={{ color: "#fff", fontWeight: "bold" }}>OK</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		);
	}

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: Colors.navy }}>
			{/* Header */}
			<View
				style={{ justifyContent: "center", alignItems: "center", padding: 20 }}>
				<Image
					source={require("../assets/images/login-graphic.png")}
					style={{
						width: width * 0.5,
						height: height * 0.25,
						marginBottom: 10,
					}}
					resizeMode="contain"
				/>
				<View style={{ alignItems: "flex-start", width: "90%" }}>
					<Text style={[Fonts.header1, { color: Colors.white, marginTop: 15 }]}>
						Halo, Selamat Datang!
					</Text>
					<Text
						style={[
							Fonts.paragraphRegularSmall,
							{ color: "#e0e0e0", marginTop: 5 },
						]}>
						Akses dokumen dan persuratan kapan saja, dimana saja.
					</Text>
				</View>
			</View>

			{/* Login Box dengan animasi */}
			<Animated.View
				style={{
					backgroundColor: Colors.white,
					borderTopLeftRadius: 30,
					borderTopRightRadius: 30,
					paddingHorizontal: width * 0.07,
					paddingVertical: 25,
					transform: [{ translateY: slideAnim }],
					flex: 1,
				}}>
				<Text
					style={[Fonts.header1, { color: Colors.black, marginBottom: 20 }]}>
					Login
				</Text>

				{/* Email */}
				<TextField
					label="Email"
					placeholder="example@gmail.com"
					value={email}
					onChangeText={setEmail}
					helperText={errors.email}
					status={errors.email ? "error" : "default"}
				/>

				<PasswordField
					label="Password"
					placeholder="******"
					value={password}
					onChangeText={setPassword}
					helperText={errors.password}
					status={errors.password ? "error" : "default"}
				/>

				{/* Forgot Password */}
				<TouchableOpacity
					style={{ alignItems: "flex-end", marginVertical: 10 }}>
					<Text style={[Fonts.paragraphMediumSmall, { color: Colors.navy }]}>
						Forgot Password ?
					</Text>
				</TouchableOpacity>

				<Button
					title={loading ? "Loading..." : "Login"}
					size="large"
					variant="solid"
					onPress={handleLogin}
					style={{ width: "100%", marginTop: 10 }}
				/>
				<CustomAlert
					visible={alertVisible}
					title="Error"
					message={alertMsg}
					onClose={() => setAlertVisible(false)}
				/>
				{/* <Button
					title="Login"
					size="large"
					variant="solid"
					loading={loading}
					onPress={handleLogin}
					style={{ width: "100%", marginTop: 10 }}
				/> */}
			</Animated.View>
		</SafeAreaView>
	);
}
