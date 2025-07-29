// src/socket/socket.server.ts
import { Server } from "socket.io";
import { Server as HTTPServer } from "http";
import {
  attachSocketServer,
  startSerialReading,
} from "../services/weighing.service";
import colors from "colors";

export function initializeSocketIO(server: HTTPServer) {
  const io = new Server(server, {
    cors: { origin: "*" }, // ajustá si tenés dominio específico
  });

  attachSocketServer(io);
  startSerialReading();

  io.on("connection", (socket) => {
    console.log(colors.green(`🟢 Cliente conectado: ${socket.id}`));
    socket.on("disconnect", () => {
      console.log(colors.red(`🔴 Cliente desconectado: ${socket.id}`));
    });
  });
}
