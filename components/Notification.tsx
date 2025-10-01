import { Colors } from "@/constants/colors";
import { Fonts } from "@/constants/fonts";
import { FontAwesome6 } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
	title: string;
	subtitle: string;
	date: string;
	accent?: string; // warna ikon (default navy)
	unread?: boolean; // kalau read → tone teks lebih abu
	onPress?: () => void;
};

function withAlpha(hex: string, alpha = 0.15) {
	// hex -> rgba()
	const h = hex.replace("#", "");
	const r = parseInt(h.substring(0, 2), 16);
	const g = parseInt(h.substring(2, 4), 16);
	const b = parseInt(h.substring(4, 6), 16);
	return `rgba(${r},${g},${b},${alpha})`;
}

export default function Notification({
	title,
	subtitle,
	date,
	accent = Colors.navy,
	unread = true,
	onPress,
}: Props) {
	return (
		<TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.row}>
			{/* icon badge */}
			<View
				style={[styles.badge, { backgroundColor: withAlpha(accent, 0.15) }]}>
				<FontAwesome6 name="paper-plane" size={18} color={accent} />
			</View>

			{/* texts */}
			<View style={{ flex: 1, gap: 2 }}>
				<Text
					style={[Fonts.paragraphMediumLarge, { color: Colors.textPrimary }]}>
					{title}
				</Text>
				<Text
					style={[
						Fonts.paragraphRegularSmall,
						{ color: unread ? Colors.textSecondary : Colors.gray },
					]}
					numberOfLines={1}>
					{subtitle}
				</Text>
				<Text
					style={[
						Fonts.paragraphRegularSmall,
						{
							color: unread ? Colors.textSecondary : Colors.gray,
							opacity: 0.8,
						},
					]}
					numberOfLines={1}>
					{date}
				</Text>
			</View>

			{/* chevron */}
			<FontAwesome6
				name="chevron-right"
				size={18}
				color={unread ? Colors.textSecondary : Colors.gray}
			/>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	row: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 14,
		paddingHorizontal: 16,
		backgroundColor: Colors.white,
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderBottomColor: "#E7E7E7",
		gap: 12,
	},
	badge: {
		width: 36,
		height: 36,
		borderRadius: 10,
		alignItems: "center",
		justifyContent: "center",
	},
});
