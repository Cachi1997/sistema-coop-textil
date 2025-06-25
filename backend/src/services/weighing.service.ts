// src/services/weighing.service.ts
import { SerialPort } from "serialport";
import { Server } from "socket.io";

let io: Server | null = null;

export function attachSocketServer(socket: Server) {
  io = socket;
}

export function startSerialReading() {
  const port = new SerialPort({
    path: "COM3",
    baudRate: 9600,
  });

  port.on("data", (data) => {
    const raw = data.toString("utf-8").trim();
    const weight = parseFloat(raw);

    if (!isNaN(weight)) {
      io?.emit("weight", weight); // envia a todos los clientes
    }
  });

  port.on("error", (err) => {
    console.error("Error en puerto serie:", err.message);
  });
}
