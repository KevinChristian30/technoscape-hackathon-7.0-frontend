import { io } from "socket.io-client";

const URL = "https://zdfktn9g-8080.asse.devtunnels.ms/ws/asd";

export const socket = io(URL, {
  autoConnect: false
});
