import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export const useWeightSocket = () => {
  const [weight, setWeight] = useState<number | null>(null);

  useEffect(() => {
    const socket = io(import.meta.env.VITE_SOCKET_URL, {
      transports: ["websocket"],
    });

    socket.on("weight", (data: number) => setWeight(data));

    return () => {
      socket.disconnect();
    };
  }, []);

  return weight;
};
