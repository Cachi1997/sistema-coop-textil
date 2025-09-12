import http from "http";
import server from "./server";
import { initializeSocketIO } from "./socket/socket.weighing";
import { connectDB } from "./server";
import { generateDailyBatch, getCurrentBatch } from "./services/batchServices"; // Cambiar a getCurrentBatch
import { batchGenerationTask } from "./jobs/batch.jobs";

const startServer = async () => {
  try {
    await connectDB();
    
    // Obtener/inicializar batch actual al iniciar la aplicación
    // Esto respeta la lógica de horarios y no crea lotes prematuros
    const currentBatch = await getCurrentBatch();
    console.log(`📦 Current batch initialized: Batch #${currentBatch?.batchNumber || 'None'}`);
    
    
    await generateDailyBatch()
    // Iniciar el cron job para ejecución automática
    batchGenerationTask();
    console.log("🕒 Batch generation cron job scheduled for 06:00 AM (Mon-Sat)");
    
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
