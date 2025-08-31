import { useState, useEffect } from "react";
import type { TachaItem, TachaFilters } from "../types/orders";
import { useSelectorsData } from "./useSelectorsData";
import axiosInstance from "../config/axiosInstance";

export const useTachasList = () => {
  const [tachas, setTachas] = useState<TachaItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [sections, setSections] = useState<
    Array<{ value: string; label: string }>
  >([]);
  const [isLoadingSections, setIsLoadingSections] = useState(false);

  const selectorsData = useSelectorsData();

  const [filters, setFilters] = useState<TachaFilters>({
    date: new Date().toISOString().split("T")[0],
    clientId: 0,
    truck: "",
    section: "",
  });

  // Opciones mock para camiones (puedes reemplazar con datos del backend)
  const truckOptions = [
    { value: "F25001", label: "F25001" },
    { value: "F25002", label: "F25002" },
    { value: "F25003", label: "F25003" },
    { value: "T30001", label: "T30001" },
    { value: "T30002", label: "T30002" },
  ];

  useEffect(() => {
    const fetchSections = async () => {
      setIsLoadingSections(true);
      try {
        const response = await axiosInstance.get("utilities/sections");
        // Asumiendo que el backend devuelve un array de objetos con id y name
        const sectionsData = response.data.map((section: any) => ({
          value: section.id || section.value,
          label: section.name || section.label,
        }));
        setSections(sectionsData);
      } catch (err: any) {
        console.error("Error al obtener secciones:", err);
        setSections([]);
      } finally {
        setIsLoadingSections(false);
      }
    };

    fetchSections();
  }, []);

  const fetchTachas = async () => {
    if (filters.clientId === 0 || !filters.truck) {
      setError("Debe seleccionar un cliente y un camión");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);
    setHasSearched(true);

    try {
      const response = await axiosInstance.get(
        `materials/materialReceipt?truck=${filters.truck}&clientId=${filters.clientId}`
      );
      setTachas(response.data);
    } catch (err: any) {
      console.error("Error al obtener tachas:", err);
      setError(err.response?.data?.message || "Error al cargar los datos");
      setTachas([]);
    } finally {
      setIsLoading(false);
    }
  };

  const updateFilter = (key: keyof TachaFilters, value: string | number) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const toggleDispatched = (tachaId: number, currentStatus: boolean) => {
    setTachas((prev) =>
      prev.map((tacha) =>
        tacha.id === tachaId ? { ...tacha, dispatched: !currentStatus } : tacha
      )
    );
  };

  const saveDispatchedData = async () => {
    const selectedIds = tachas
      .filter((tacha) => tacha.dispatched)
      .map((tacha) => tacha.id);

    if (selectedIds.length === 0) {
      setError("Debe seleccionar al menos una tacha para guardar");
      return;
    }

    if (!filters.section) {
      setError("Debe seleccionar una sección para guardar");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const dataToSend = {
        ids: selectedIds,
        truck: filters.truck,
        clientId: filters.clientId,
        section: filters.section,
      };

      await axiosInstance.post("delivery-notes/delivery-note", dataToSend);

      setSuccessMessage(
        `Se guardaron exitosamente ${selectedIds.length} tachas remitidas`
      );
      setError(null);
      // Limpiar las selecciones después del éxito
      setTachas((prev) =>
        prev.map((tacha) => ({ ...tacha, dispatched: false }))
      );
    } catch (err: any) {
      console.error("Error al guardar datos:", err);
      setError(err.response?.data?.message || "Error al guardar los datos");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    tachas,
    isLoading,
    error,
    successMessage,
    hasSearched,
    filters,
    truckOptions,
    sectionOptions: sections,
    isLoadingSections,
    selectorsData: selectorsData.selectorsData,
    isLoadingSelectors: selectorsData.isLoading,
    selectorsError: selectorsData.error,
    updateFilter,
    fetchTachas,
    toggleDispatched,
    saveDispatchedData,
  };
};
