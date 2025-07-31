import { useForm } from "react-hook-form";
import type { OrderFormData, OrderPayload } from "../types/orders";
import { useModal } from "./useModal";
import { usePPEData } from "./usePPEData";
import { useFormNavigation } from "./useFormNavigation";
import axios from "../config/axiosInstance";
import { useEffect } from "react";
import { useSelectorsData } from "./useSelectorsData";

const campos = [
  { name: "ppe", label: "PPE", type: "number" },
  { name: "partOriginal", label: "Part Original", type: "number" },
  { name: "orderNumber", label: "N° Orden", type: "number" },
  { name: "date", label: "Fecha", type: "date" },
  { name: "clientId", label: "Cliente", type: "select" },
  { name: "denierId", label: "Denier", type: "select" },
  { name: "toneId", label: "Lustre", type: "select" },
  { name: "productId", label: "Producto", type: "select" },
  { name: "colorId", label: "Color", type: "select" },
  { name: "rawMaterialId", label: "Origen", type: "select" },
  { name: "kilos", label: "Kilos", type: "number" },
  { name: "kilosPasados", label: "Kilos Pasados", type: "number" },
  { name: "camiones", label: "Camiones", type: "text" },
  { name: "observaciones", label: "Observaciones", type: "textarea" },
];

export const useOrderForm = () => {
  const form = useForm<OrderFormData>({
    defaultValues: {
      ppe: 0,
      partOriginal: 0,
      orderNumber: 0,
      date: new Date().toISOString().split("T")[0], // Fecha actual por defecto
      clientId: 0,
      denierId: 0,
      toneId: 0,
      productId: 0,
      colorId: 0,
      rawMaterialId: 0,
      kilos: 0,
      kilosPasados: 0,
      camiones: "",
      observaciones: "",
    },
  });

  const modal = useModal();
  const selectorsData = useSelectorsData();
  const ppeData = usePPEData();
  const navigation = useFormNavigation({
    setFocus: form.setFocus,
    campos,
  });

  // Actualizar el PPE en el formulario cuando se carga
  useEffect(() => {
    // Cambiar la condición para que funcione incluso cuando currentPPE es 0
    if (ppeData.currentPPE >= 0 && !ppeData.isLoading) {
      const nextPPE = ppeData.currentPPE + 1;
      form.setValue("ppe", nextPPE);
    }
  }, [ppeData.currentPPE, ppeData.isLoading, form]);

  const handleEnterKey = async (e: any, index: number) => {
    if (e.key === "Enter") {
      e.preventDefault();

      // Para textarea, permitir Enter para nueva línea con Shift+Enter
      if (campos[index].type === "textarea" && !e.shiftKey) {
        return; // No navegar si es textarea y no se presiona Shift
      }

      // Navegar al siguiente campo
      navigation.navigateToNextField(index);
    }
  };

  const createOrder = async (data: OrderPayload) => {
    try {
      // Aquí es donde se hace la llamada real al backend
      console.log("Enviando datos al backend:", data);

      const resp = await axios.post("/api/orders", data);
      console.log("Respuesta del backend (éxito):", resp.data);
    } catch (error: any) {
      console.error(
        "Error al enviar orden al backend:",
        error.response?.data || error.message
      );
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Error desconocido al crear la orden.";
      throw new Error(errorMessage);
    }
  };

  const resetForm = () => {
    const nextPPE = ppeData.currentPPE >= 0 ? ppeData.currentPPE + 1 : 1;
    form.reset({
      ppe: nextPPE,
      partOriginal: 0,
      orderNumber: 0,
      date: new Date().toISOString().split("T")[0],
      clientId: 0,
      denierId: 0,
      toneId: 0, //Lustre
      productId: 0,
      colorId: 0,
      rawMaterialId: 0, // Origen
      kilos: 0,
      kilosPasados: 0,
      camiones: "",
      observaciones: "",
    });
    // Volver a enfocar el primer campo después de limpiar
    setTimeout(() => {
      form.setFocus("ppe");
      navigation.setActiveFieldIndex(0);
    }, 100);
  };

  const refreshPPE = () => {
    ppeData.refreshPPE();
  };

  return {
    form,
    modal,
    navigation,
    selectorsData: selectorsData.selectorsData,
    isLoadingSelectors: selectorsData.isLoading,
    selectorsError: selectorsData.error,
    currentPPE: ppeData.currentPPE,
    nextPPE: ppeData.currentPPE >= 0 ? ppeData.currentPPE + 1 : 1,
    isLoadingPPE: ppeData.isLoading,
    ppeError: ppeData.error,
    campos,
    handleEnterKey,
    createOrder,
    resetForm,
    refreshPPE,
    refetchSelectorsData: selectorsData.refetchData,
    activeFieldIndex: navigation.activeFieldIndex,
  };
};
