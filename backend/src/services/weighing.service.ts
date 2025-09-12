// src/services/weighing.service.ts
import { SerialPort } from "serialport";
import { Server } from "socket.io";
import dotenv from "dotenv";
dotenv.config();

let io: Server | null = null;

export function attachSocketServer(socket: Server) {
  io = socket;
}

export function startSerialReading() {
  const port = new SerialPort({
    path: process.env.SOCKET_PATH || "COM4",
    baudRate: parseInt(process.env.SOCKET_BAUD_RATE ) || 1200,
  });

  
  port.on("open", () => {
    console.log(`✅ Puerto serie abierto: ${process.env.SOCKET_PATH}`);
  });

  port.on("data", (data) => {
    const raw = data.toString("utf-8").trim();
    // Extraer los últimos 5 o 6 dígitos numéricos del string
    const match = raw.match(/[A-Z]?(\d{5,6})$/); // acepta una letra opcional al inicio
    if (match) {
      const numericString = match[1];
      const weight = parseInt(numericString, 10); // ya está en kilogramos
      io?.emit("weight", weight);
    } else {
      console.log("❌ No se pudo interpretar como peso:", raw);
    }
  });

  port.on("error", (err) => {
    console.error("Error en puerto serie:", err.message);
  });
}
