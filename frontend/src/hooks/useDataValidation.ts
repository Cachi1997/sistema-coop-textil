import { useState } from "react";
import axios from "../config/axiosInstance";
import type { orderWeightResponse } from "../types";

interface DataValidationParams {
  ppe: number;
  batch: number;
  isYarn: number;
}

export const useDataValidation = () => {
  const [orderFindings, setOrderFindings] = useState<orderWeightResponse>({
    ppe: 0,
    batchNumber: 0,
    orderNumber: 0,
    idColor: "",
    color: "",
    denier: 0,
    tone: "",
    material: "",
    product: "",
    client: "",
  });

  const buscarDatos = async ({
    ppe,
    batch,
    isYarn,
  }: DataValidationParams): Promise<void> => {
    try {
      const res = await axios.get(
        `/orders/orderWeight?ppe=${ppe}&batch=${batch}&isYarn=${isYarn}`
      );
      setOrderFindings(res.data);
      console.log("Datos encontrados:", orderFindings);
    } catch (error) {
      console.error("Error al buscar datos:", error);
    }
  };

  return {
    buscarDatos,
    orderFindings,
  };
};
