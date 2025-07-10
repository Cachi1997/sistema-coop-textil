import axios from "../config/axiosInstance";

interface DataValidationParams {
  ppe: number;
  batch: number;
  isYarn: number;
}

export const useDataValidation = () => {
  const buscarDatos = async ({
    ppe,
    batch,
    isYarn,
  }: DataValidationParams): Promise<boolean> => {
    try {
      const res = await axios.get(
        `/data?ppe=${ppe}&batch=${batch}&isYarn=${isYarn}`
      );

      if (!res.data || res.data.length === 0) {
        return false;
      }

      console.log("Datos encontrados:", res.data);
      return true;
    } catch (error) {
      console.error("Error al buscar datos:", error);
      return false;
    }
  };

  return {
    buscarDatos,
  };
};
