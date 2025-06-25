// src/socket/socket.server.ts
import { Server } from "socket.io";
import { Server as HTTPServer } from "http";
import {
  attachSocketServer,
  startSerialReading,
} from "../services/weighing.service";

export function initializeSocketIO(server: HTTPServer) {
  const io = new Server(server, {
    cors: { origin: "*" }, // ajustá si tenés dominio específico
  });

  attachSocketServer(io);
  startSerialReading();

  io.on("connection", (socket) => {
    console.log(`🟢 Cliente conectado: ${socket.id}`);

    socket.on("disconnect", () => {
      console.log(`🔴 Cliente desconectado: ${socket.id}`);
    });
  });
}
