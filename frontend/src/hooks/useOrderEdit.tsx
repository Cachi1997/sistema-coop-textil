import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import type { OrderFormData, OrderDetail } from "../types/orders";
import { useModal } from "./useModal";
import { useSelectorsData } from "./useSelectorsData";
import { useFormNavigation } from "./useFormNavigation";
import axios from "../config/axiosInstance";

const campos = [
  { name: "ppe", label: "PPE", type: "number" },
  { name: "originalBatch", label: "Part Original", type: "number" },
  { name: "orderNumber", label: "N° Orden", type: "number" },
  { name: "date", label: "Fecha", type: "date" },
  { name: "clientId", label: "Cliente", type: "select" },
  { name: "denierId", label: "Denier", type: "select" },
  { name: "toneId", label: "Tono", type: "select" },
  { name: "productId", label: "Producto", type: "select" },
  { name: "colorId", label: "Color", type: "select" },
  { name: "rawMaterialId", label: "Material", type: "select" },
  { name: "kilos", label: "Kilos", type: "number" },
  { name: "passedKilos", label: "Kilos Pasados", type: "number" },
  { name: "truck1", label: "Camión 1", type: "text" },
  { name: "truck2", label: "Camión 2", type: "text" },
  { name: "notes", label: "Observaciones", type: "textarea" },
];

export const useOrderEdit = (orderId: string) => {
  const [orderData, setOrderData] = useState<OrderDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const form = useForm<OrderFormData>();
  const modal = useModal();
  const selectorsData = useSelectorsData();
  const navigation = useFormNavigation({
    setFocus: form.setFocus,
    campos,
  });

  // Cargar datos de la orden
  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await axios.get(`/orders/order/${orderId}`);
        const order: OrderDetail = response.data;
        setOrderData(order);
        setIsCompleted(order.status === "completada");

        // Llenar el formulario con los datos existentes
        form.reset({
          ppe: order.ppe,
          originalBatch: order.batchNumber,
          orderNumber: order.orderNumber,
          date: order.date,
          clientId: order.clientId,
          denierId: order.denierId,
          toneId: order.toneId,
          productId: order.productId,
          colorId: order.colorId,
          rawMaterialId: order.rawMaterialId,
          kilos: Number.parseFloat(order.kilos),
          passedKilos: order.passedKilos
            ? Number.parseFloat(order.passedKilos)
            : undefined,
          truck1: order.firstTruck,
          truck2: order.secondTruck,
          notes: order.observation,
        });
      } catch (err: any) {
        console.error("Error al cargar orden:", err);
        setError(err.response?.data?.message || "Error al cargar la orden");
      } finally {
        setIsLoading(false);
      }
    };

    if (orderId) {
      fetchOrderData();
    }
  }, [orderId, form]);

  const handleEnterKey = (
    e: React.KeyboardEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    index: number
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (campos[index].type === "textarea" && !e.shiftKey) {
        return;
      }
      navigation.navigateToNextField(index);
    }
  };

  const updateOrder = async (data: OrderFormData) => {
    try {
      const updatePayload = {
        ...data,
        firstTruck: data.truck1,
        secondTruck: data.truck2,
        observation: data.notes,
        batchNumber: data.originalBatch,
      };

      await axios.put(`/orders/order/${orderId}`, updatePayload);
      console.log("Orden actualizada exitosamente");
    } catch (error: any) {
      console.error("Error al actualizar orden:", error);
      const errorMessage =
        error.response?.data?.message || "Error al actualizar la orden";
      throw new Error(errorMessage);
    }
  };

  const toggleOrderCompletion = async () => {
    try {
      const newStatus = isCompleted ? "pendiente" : "completada";
      await axios.patch(`/orders/order/${orderId}/status`, {
        status: newStatus,
      });
      setIsCompleted(!isCompleted);

      // Actualizar los datos locales
      if (orderData) {
        setOrderData({ ...orderData, status: newStatus as any });
      }
    } catch (error: any) {
      console.error("Error al cambiar estado:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Error al cambiar el estado de la orden";
      throw new Error(errorMessage);
    }
  };

  const canEdit = orderData && orderData.status !== "cancelada";

  return {
    form,
    modal,
    navigation,
    orderData,
    isLoading,
    error,
    isCompleted,
    canEdit,
    selectorsData: selectorsData.selectorsData,
    isLoadingSelectors: selectorsData.isLoading,
    selectorsError: selectorsData.error,
    campos,
    handleEnterKey,
    updateOrder,
    toggleOrderCompletion,
    activeFieldIndex: navigation.activeFieldIndex,
  };
};
