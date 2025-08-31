import http from "http";
import server from "./server";
import { initializeSocketIO } from "./socket/socket.weighing";
import { connectDB } from "./server"; // <- exportá esto
import { generateDailyBatch } from "./services/batchServices";

const startServer = async () => {
  try {
    await connectDB();

    await generateDailyBatch();

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
