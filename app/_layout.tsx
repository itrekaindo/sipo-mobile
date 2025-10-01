import BottomNav from "@/components/BottomNav";
import { useColorScheme } from "@/hooks/use-color-scheme";
import {
	Inter_400Regular,
	Inter_500Medium,
	Inter_600SemiBold,
	Inter_700Bold,
	useFonts,
} from "@expo-google-fonts/inter";
import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native";
import { Stack, usePathname } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

export const unstable_settings = { anchor: "login" };

const groupsWithBottomNav = [
	"/beranda",
	"/undangan",
	"/profil",
	"/risalah",
	"/memo",
];

export default function RootLayout() {
	const [fontsLoaded] = useFonts({
		Inter_400Regular,
		Inter_500Medium,
		Inter_600SemiBold,
		Inter_700Bold,
	});
	const colorScheme = useColorScheme();
	const pathname = usePathname();
	if (!fontsLoaded) return null;

	const showBottomNav = groupsWithBottomNav.some((p) => pathname.startsWith(p));

	return (
		<ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
			<View style={{ flex: 1 }}>
				<Stack initialRouteName="splash/splash1">
					{/* Beranda  */}
					<Stack.Screen
						name="beranda/beranda"
						options={{ headerShown: false }}
					/>

					{/* Notifikasi  */}
					<Stack.Screen
						name="notifikasi/notifikasi"
						options={{ headerShown: false }}
					/>

					{/* Splash */}
					<Stack.Screen
						name="splash/splash1"
						options={{ headerShown: false, animation: "slide_from_right" }}
					/>
					<Stack.Screen
						name="splash/splash2"
						options={{ headerShown: false, animation: "slide_from_right" }}
					/>
					<Stack.Screen
						name="splash/splash3"
						options={{ headerShown: false, animation: "slide_from_right" }}
					/>
					<Stack.Screen
						name="splash/splash4"
						options={{ headerShown: false, animation: "slide_from_right" }}
					/>

					{/* Main */}
					<Stack.Screen name="login" options={{ headerShown: false }} />
					<Stack.Screen
						name="modal"
						options={{ presentation: "modal", title: "Modal" }}
					/>
					<Stack.Screen
						name="undangan/undangan"
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="risalah/risalah"
						options={{ headerShown: false }}
					/>
					<Stack.Screen name="profil/profil" options={{ headerShown: false }} />
				</Stack>

				<StatusBar style="auto" />

				{/* tampilkan hanya di folder yang diizinkan */}
				{showBottomNav && (
					<View
						pointerEvents="box-none"
						style={{ position: "absolute", left: 0, right: 0, bottom: 0 }}>
						<BottomNav />
					</View>
				)}
			</View>
		</ThemeProvider>
	);
}
