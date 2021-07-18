import axios from "axios";
import soketio from "socket.io-client";

const api = axios.create({
   baseURL: "https://server.app-com.digital",
   // baseURL: "http://192.168.0.246:3333",
});

const socket = soketio("https://server.app-com.digital");
// const socket = soketio("https://192.168.0.246:3333");

export { api, socket };
