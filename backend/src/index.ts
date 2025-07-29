import http from "http";
import server from "./server";
import { initializeSocketIO } from "./socket/socket.weighing";
import { connectDB } from "./server"; // <- exportá esto

const startServer = async () => {
  try {
    await connectDB(); // asegurate que esté lista la DB

    const httpServer = http.createServer(server);

    initializeSocketIO(httpServer);

    const PORT = Number(process.env.PORT) || 3000;
    httpServer.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
};

startServer();
