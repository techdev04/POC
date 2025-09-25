import axios from "axios";

const api = axios.create({
  baseURL: "/api", // thanks to Vite proxy, this forwards to Django's http://localhost:8000/api
  headers: {
    "Content-Type": "application/json",
  },
});

export const sendMessage = async (message) => {
  try {
    const response = await api.post("/chat/", { message });
    return response.data;
  } catch (error) {
    console.error("Error sending message:", error);
    throw new Error(error.response?.data?.error || "Failed to send message");
  }
};

export default api;
