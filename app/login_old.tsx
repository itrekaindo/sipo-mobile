import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Image,
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import Button from "../components/button";
import { PasswordField, TextField } from "../components/FormControl";
import { Colors } from "../constants/colors";
import { Fonts } from "../constants/fonts";
import { postData } from "./api";
import storage from "./storage";

export default function LoginScreen() {
  const { width, height } = useWindowDimensions();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const slideAnim = useRef(new Animated.Value(200)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [slideAnim]);

  const handleLogin = async () => {
    console.log("Logging in with:", { email, password });
    console.log("Platform: " + Platform.OS);
    setLoading(true);
    try {
      const response = await postData("/login", { email, password });
      console.log("Login response:", response);
      // TODO: handle success
      const token = response.token;

      if (token) {
        await storage.setItem("token", token);

        // Navigate to the main app screen or dashboard
        console.log("Login successful, Token dan user ID tersimpan.");
      } else {
        Alert.alert("Login Failed", "Token tidak ditemukan.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.navy }}>
      {/* Header */}
      <View
        style={{ justifyContent: "center", alignItems: "center", padding: 20 }}
      >
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
            ]}
          >
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
        }}
      >
        <Text
          style={[Fonts.header1, { color: Colors.black, marginBottom: 20 }]}
        >
          Login
        </Text>

        {/* Email */}
        <TextField
          label="Email"
          placeholder="example@gmail.com"
          value={email}
          onChangeText={setEmail}
        />

        {/* Password */}
        <PasswordField
          label="Password"
          placeholder="******"
          value={password}
          onChangeText={setPassword}
        />

        {/* Forgot Password */}
        <TouchableOpacity
          style={{ alignItems: "flex-end", marginVertical: 10 }}
        >
          <Text style={[Fonts.paragraphMediumSmall, { color: Colors.navy }]}>
            Forgot Password ?
          </Text>
        </TouchableOpacity>

        {/* Button */}
        <Button
          title="Login"
          size="large"
          variant="solid"
          loading={loading}
          onPress={handleLogin}
          style={{ width: "100%", marginTop: 10 }}
        />
      </Animated.View>
    </SafeAreaView>
  );
}
