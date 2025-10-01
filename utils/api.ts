import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "https://sipo.ptrekaindo.co.id/api";

export const apiFetch = async (endpoint: string, options: any = {}) => {
  try {
    const token = await AsyncStorage.getItem("token");

    const headers = {
      "Accept": "application/json",
      "Content-Type": "application/json",
      ...(token ? { "Authorization": `Bearer ${token}` } : {}),
      ...options.headers,
    };

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API Fetch Error:", error);
    throw error;
  }
};

