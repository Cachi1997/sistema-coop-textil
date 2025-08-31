import { useState, useEffect } from "react";
import axios from "../config/axiosInstance";

export const usePPEData = () => {
  const [currentPPE, setCurrentPPE] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCurrentPPE = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get("/utilities/lastPPE");
      setCurrentPPE(response.data.ppe);
    } catch (error: any) {
      console.error("Error al cargar PPE actual:", error);
      setError("Error al cargar el PPE actual.");
      setCurrentPPE(0);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentPPE();
  }, []);

  const refreshPPE = () => {
    fetchCurrentPPE();
  };

  return {
    currentPPE,
    isLoading,
    error,
    refreshPPE,
  };
};
