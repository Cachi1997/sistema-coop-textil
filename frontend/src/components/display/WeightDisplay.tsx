import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const SOCKET_URL = "http://localhost:3000"; // Cambia por la URL real de tu backend

const WeightDisplay: React.FC = () => {
  const [weight, setWeight] = useState<number | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketIo = io(SOCKET_URL, {
      transports: ["websocket"],
    });
    setSocket(socketIo);

    socketIo.on("connect", () => {
      console.log("🟢 Conectado al servidor de peso");
    });

    socketIo.on("weight", (data: number) => {
      setWeight(data);
    });

    socketIo.on("disconnect", () => {
      console.log("🔴 Desconectado del servidor");
    });

    return () => {
      socketIo.disconnect();
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Peso en tiempo real</h1>
      <div className="text-8xl font-mono text-green-600">
        {weight !== null ? weight.toFixed(2) + " kg" : "Cargando..."}
      </div>
    </div>
  );
};

export default WeightDisplay;
