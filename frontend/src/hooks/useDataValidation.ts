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
      const { data } = await axios.get(
        `/orders/orderWeight?ppe=${ppe}&batch=${batch}&isYarn=${isYarn}`
      );

      if (!data || data.length === 0) {
        setOrderData(null);
        setIsLoading(false);
        return false;
      }

      setOrderData({
        ppe: data.ppe,
        batchNumber: data.batchNumber,
        orderNumber: data.orderNumber,
        idColor: data.color.idColor,
        colorName: data.color.colorName,
        denier: data.denier.denier,
        tone: data.tone.name,
        material: data.rawMaterial.name,
        product: data.product.name,
        client: data.client.name,
      });
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
