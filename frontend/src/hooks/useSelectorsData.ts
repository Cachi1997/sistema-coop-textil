import { useState, useEffect } from "react";
import axios from "../config/axiosInstance";
import type {
  SelectorsData,
  Client,
  Denier,
  Tone,
  Product,
  Color,
  RawMaterial,
} from "../types/orders";

export const useSelectorsData = () => {
  const [selectorsData, setSelectorsData] = useState<SelectorsData>({
    clients: [],
    deniers: [],
    tones: [],
    products: [],
    colors: [],
    rawMaterials: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSelectorsData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const [
        clientsRes,
        deniersRes,
        toneRes,
        productsRes,
        colorsRes,
        rawMaterialsRes,
      ] = await Promise.all([
        axios.get("/utilities/clients"),
        axios.get("/utilities/deniers"),
        axios.get("/utilities/tones"),
        axios.get("/utilities/products"),
        axios.get("/utilities/colors"),
        axios.get("/utilities/rawMaterials"),
      ]);

      setSelectorsData({
        clients: clientsRes.data as Client[],
        deniers: deniersRes.data as Denier[],
        tones: toneRes.data as Tone[],
        products: productsRes.data as Product[],
        colors: colorsRes.data as Color[],
        rawMaterials: rawMaterialsRes.data as RawMaterial[],
      });
    } catch (error: any) {
      console.error("Error al cargar datos de selectores:", error);
      setError(
        "Error al cargar los datos de los selectores. Intente nuevamente."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSelectorsData();
  }, []);

  const refetchData = () => {
    fetchSelectorsData();
  };

  return {
    selectorsData,
    isLoading,
    error,
    refetchData,
  };
};
