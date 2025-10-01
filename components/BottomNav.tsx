// components/BottomNav.tsx
import { FontAwesome } from "@expo/vector-icons";
import { usePathname, useRouter, type Href } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

const COLORS = {
	bg: "#fff",
	border: "#eee",
	active: "#000",
	inactive: "#9AA0A6",
};

type NavItem = {
	key: string;
	icon: keyof typeof FontAwesome.glyphMap;
	href: Href;
};

// Tanam item di komponen dgn tipe Href
const ITEMS: NavItem[] = [
	{ key: "home", icon: "home", href: "/beranda/beranda" },
	{ key: "document", icon: "file", href: "/memo/memos" },
	{ key: "mail", icon: "envelope", href: "/undangan/undangan" },
	{ key: "book", icon: "book", href: "/risalah/risalah" },
	{ key: "profile", icon: "user", href: "/profil/profil" },
];

export default function BottomNav() {
	const pathname = usePathname();
	const router = useRouter();

	return (
		<View style={styles.container}>
			{ITEMS.map((item) => {
				const isActive =
					pathname === item.href || pathname.startsWith(item.href + "/");
				return (
					<TouchableOpacity
						key={item.key}
						onPress={() => router.replace(item.href)}
						style={styles.item}
						hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
						<FontAwesome
							name={item.icon}
							size={24}
							color={isActive ? COLORS.active : COLORS.inactive}
						/>
					</TouchableOpacity>
				);
			})}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		paddingVertical: 12,
		borderTopWidth: 1,
		borderTopColor: COLORS.border,
		backgroundColor: COLORS.bg,
	},
	item: { alignItems: "center", justifyContent: "center" },
});
