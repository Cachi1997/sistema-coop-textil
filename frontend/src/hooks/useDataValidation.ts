import { useState } from "react";
import axios from "../config/axiosInstance";
import type { orderWeightResponse } from "../types";

interface DataValidationParams {
  ppe: number;
  batch: number;
  isYarn: number;
}

export const useDataValidation = () => {
  const [orderData, setOrderData] = useState<orderWeightResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const buscarDatos = async ({
    ppe,
    batch,
    isYarn,
  }: DataValidationParams): Promise<boolean> => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `/orders/orderWeight?ppe=${ppe}&batch=${batch}&isYarn=${isYarn}`
      );

      if (!res.data || res.data.length === 0) {
        setOrderData(null);
        setIsLoading(false);
        return false;
      }

      // Asumiendo que el backend retorna los datos en el formato esperado
      const data: orderWeightResponse = res.data;
      setOrderData(data);
      console.log("Datos encontrados:", data);
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error("Error al buscar datos:", error);
      setOrderData(null);
      setIsLoading(false);
      return false;
    }
  };

  const clearOrderData = () => {
    setOrderData(null);
  };

  return {
    orderData,
    isLoading,
    buscarDatos,
    clearOrderData,
  };
};
