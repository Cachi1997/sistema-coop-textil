import { useState, useEffect } from "react";
import axios from "../config/axiosInstance";
import type { OrderDetail } from "../types/orders";

export const useOrderDetail = (orderId: string | undefined) => {
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!orderId) {
      setIsLoading(false);
      setError("ID de orden no proporcionado.");
      return;
    }

    const fetchOrderDetail = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get<OrderDetail>(
          `/orders/order/${orderId}`
        );
        setOrder(response.data);
      } catch (err: any) {
        console.error(`Error al obtener detalles de la orden ${orderId}:`, err);
        setError(
          err.response?.data?.message ||
            err.message ||
            "Error al cargar los detalles de la orden."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderDetail();
  }, [orderId]);

  return { order, isLoading, error };
};
