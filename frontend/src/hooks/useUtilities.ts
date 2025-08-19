import { useState, useEffect } from "react";
import axiosInstance from "../config/axiosInstance";

export type UtilityEntity =
  | "clients"
  | "colors"
  | "deniers"
  | "rawMaterials"
  | "products"
  | "sections"
  | "tones";

export type UtilityItem = {
  id: number;
  name: string;
  code?: string;
  description?: string;
  denier?: number | string;
  colorName?: string;
  hexCode?: string;
};

export type UtilityConfig = {
  entityType: UtilityEntity;
  title: string;
  endpoint: string;
  createEndpoint: string;
  fields: Array<{
    key: string;
    label: string;
    type: "text" | "number" | "color" | "select";
    required?: boolean;
  }>;
};

export const useUtilities = (config: UtilityConfig) => {
  const [items, setItems] = useState<UtilityItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const fetchItems = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(config.endpoint);
      setItems(response.data);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          `Error al cargar ${config.title.toLowerCase()}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const createItem = async (itemData: Partial<UtilityItem>) => {
    setIsCreating(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await axiosInstance.post(
        config.createEndpoint,
        itemData
      );
      setItems((prev) => [...prev, response.data]);
      setSuccessMessage(`${config.title} creado exitosamente`);
      return response.data;
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          `Error al crear ${config.title.toLowerCase()}`
      );
      throw err;
    } finally {
      setIsCreating(false);
      setInterval(() => {
        clearMessages();
      }, 2000);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [config.endpoint]);

  const clearMessages = () => {
    setError(null);
    setSuccessMessage(null);
  };

  return {
    items,
    isLoading,
    error,
    successMessage,
    isCreating,
    fetchItems,
    createItem,
    clearMessages,
  };
};
