import { useForm } from "react-hook-form";
import type { OrderFormData, OrderPayload } from "../types/orders";
import { useModal } from "./useModal";
import { useSelectorsData } from "./useSelectorsData";
import { usePPEData } from "./usePPEData";
import { useFormNavigation } from "./useFormNavigation";
import axios from "../config/axiosInstance";
import { useEffect } from "react";

const campos = [
  { name: "ppe", label: "PPE", type: "number" },
  { name: "originalBatch", label: "Part Original", type: "number" },
  { name: "orderNumber", label: "N° Orden", type: "number" },
  { name: "date", label: "Fecha", type: "date" },
  { name: "clientId", label: "Cliente", type: "select" },
  { name: "denierId", label: "Denier", type: "select" },
  { name: "toneId", label: "Lustre", type: "select" },
  { name: "productId", label: "Producto", type: "select" },
  { name: "colorId", label: "Color", type: "select" },
  { name: "rawMaterialId", label: "Origen", type: "select" },
  { name: "kilos", label: "Kilos", type: "number" },
  { name: "passedKilos", label: "Kilos Pasados", type: "number" },
  { name: "truck1", label: "Camión 1", type: "text" },
  { name: "truck2", label: "Camión 2", type: "text" },
  { name: "notes", label: "Observaciones", type: "textarea" },
];

export const useOrderForm = () => {
  const form = useForm<OrderFormData>({
    defaultValues: {
      ppe: undefined, // Comenzar vacío, se llenará automáticamente
      originalBatch: undefined, // Corregido el typo
      orderNumber: undefined, // Vacío
      date: new Date().toISOString().split("T")[0], // Fecha actual por defecto
      clientId: 0,
      denierId: 0,
      toneId: 0,
      productId: 0,
      colorId: 0,
      rawMaterialId: 0,
      kilos: undefined, // Vacío
      passedKilos: undefined, // Vacío
      truck1: "",
      truck2: "",
      notes: "",
    },
  });

  const modal = useModal();
  const selectorsData = useSelectorsData();
  const ppeData = usePPEData();
  const navigation = useFormNavigation({
    setFocus: form.setFocus,
    campos,
  });

  // Actualizar el PPE en el formulario cuando se carga (sumando 1 al valor del backend)
  useEffect(() => {
    // Cambiar la condición para que funcione incluso cuando currentPPE es 0
    if (ppeData.currentPPE >= 0 && !ppeData.isLoading) {
      const nextPPE = ppeData.currentPPE + 1;
      form.setValue("ppe", nextPPE);
    }
  }, [ppeData.currentPPE, ppeData.isLoading, form]);

  const handleEnterKey = async (
    e: React.KeyboardEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    index: number
  ) => {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
    }
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
      await axios.post("/orders/order", data);
      await ppeData.refreshPPE();
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
    // Al resetear, también usar el PPE + 1 (incluso si currentPPE es 0)
    const nextPPE = ppeData.currentPPE >= 0 ? ppeData.currentPPE + 1 : 1;

    form.reset({
      ppe: nextPPE,
      originalBatch: undefined, // Corregido el typo
      orderNumber: undefined, // Vacío al resetear
      date: new Date().toISOString().split("T")[0],
      clientId: 0,
      denierId: 0,
      toneId: 0,
      productId: 0,
      colorId: 0,
      rawMaterialId: 0,
      kilos: undefined, // Vacío al resetear
      passedKilos: undefined, // Vacío al resetear
      truck1: "",
      truck2: "",
      notes: "",
    });
    // Volver a enfocar el primer campo después de limpiar
    setTimeout(() => {
      form.setFocus("ppe");
      navigation.setActiveFieldIndex(0);
    }, 100);
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
    refetchSelectorsData: selectorsData.refetchData,
    activeFieldIndex: navigation.activeFieldIndex,
  };
};
