// src/index.ts
import http from "http";
import server from "./server";
import { initializeSocketIO } from "./socket/socket.weighing"; // lo que creamos antes

const httpServer = http.createServer(server);

// Iniciamos WebSocket + lectura RS-232
initializeSocketIO(httpServer);

const PORT = 3000;
httpServer.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
