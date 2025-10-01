// api.js
//import AsyncStorage from "@react-native-async-storage/async-storage";

//import storage from "./storage"; // use the custom storage module
//import AsyncStorage from "@react-native-async-storage/async-storage";
import { Linking } from "react-native";

const BASE_URL = "https://sipo.ptrekaindo.co.id/api"; // your API base URL
//const token = storage.getItem("token");
const token = "tolkien";

// generic fetch wrapper
async function apiFetch(endpoint, options = {}) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });

  if (response.status === 204) return [];

  const text = await response.text();
  const parsed = JSON.parse(text);

  // auto-unwrap Laravel's { data: [...] }
  if (parsed && typeof parsed === "object" && "data" in parsed) {
    return parsed.data;
  }

  return parsed;
}

// Example GET request
export function getData(endpoint) {
  return apiFetch(endpoint, { method: "GET" });
}

// Example POST request
export function postData(endpoint, body) {
  return apiFetch(endpoint, {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export async function viewPDF(type, id) {
  try {
    const response = await fetch(`${BASE_URL}/${type}s/${id}/pdf`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const blob = await response.blob();
    const pdfUrl = URL.createObjectURL(blob);

    // Open in default viewer
    await Linking.openURL(pdfUrl);
  } catch (error) {
    console.error("Error fetching PDF:", error);
  }
}
export default {
  getData,
  postData,
  viewPDF,
};
