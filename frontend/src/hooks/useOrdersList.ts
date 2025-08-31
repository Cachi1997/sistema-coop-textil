import { useState, useEffect, useMemo, useCallback } from "react";
import type {
  OrderListItem,
  OrdersFilter,
  OrderStatus,
  BackendOrderStatus,
} from "../types/orders";
import { useSelectorsData } from "./useSelectorsData"; // Para obtener la lista de clientes
import axios from "../config/axiosInstance"; // Importar axiosInstance

// Función para mapear el estado del frontend al estado del backend
const mapFrontendStatusToBackend = (
  frontendStatus: OrderStatus | "all"
): BackendOrderStatus | "all" => {
  switch (frontendStatus) {
    case "pending":
      return "pendiente";
    case "completed":
      return "completada";
    case "in_progress":
      return "en progreso";
    case "cancelled":
      return "cancelada";
    case "all":
      return "all";
    default:
      return "all"; // Fallback
  }
};

export const useOrdersList = () => {
  const { selectorsData, isLoading: isLoadingSelectors } = useSelectorsData();
  const [allOrders, setAllOrders] = useState<OrderListItem[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<OrderListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<OrdersFilter>({
    searchQuery: "",
    status: "all",
    clientId: "all",
    startDate: null,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await axios.get<OrderListItem[]>("/orders/orders");
      setAllOrders(data);
      setIsLoading(false);
    } catch (err: any) {
      console.error("Error al obtener órdenes del backend:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Error al cargar las órdenes."
      );
      setIsLoading(false);
    }
  }, []);

  // Cargar datos de órdenes desde el backend
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]); // Se ejecuta una vez al montar el componente

  // Lógica de filtrado y búsqueda
  useEffect(() => {
    let currentFilteredOrders = allOrders;

    // Filtrar por búsqueda (número de orden, PPE, cliente, producto, color)
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      currentFilteredOrders = currentFilteredOrders.filter(
        (order) =>
          order.orderNumber.toString().includes(query) ||
          order.ppe.toString().includes(query) ||
          order.client.name.toLowerCase().includes(query) || // Acceder a client.name
          order.product.name.toLowerCase().includes(query) || // Acceder a product.name
          order.color.colorName.toLowerCase().includes(query) // Acceder a color.colorName
      );
    }

    // Filtrar por estado
    if (filters.status !== "all") {
      const backendStatusToFilter = mapFrontendStatusToBackend(filters.status);
      currentFilteredOrders = currentFilteredOrders.filter(
        (order) => order.status === backendStatusToFilter
      );
    }

    // Filtrar por cliente
    if (filters.clientId !== "all") {
      // Asegurarse de que selectorsData.clients esté cargado antes de intentar filtrar por cliente
      if (selectorsData.clients.length > 0) {
        const selectedClient = selectorsData.clients.find(
          (c) => c.id === filters.clientId
        );
        if (selectedClient) {
          currentFilteredOrders = currentFilteredOrders.filter(
            (order) => order.client.name === selectedClient.name
          );
        }
      } else {
        // Si los clientes no están cargados, no se puede filtrar por cliente,
        // o se podría mostrar un mensaje de advertencia.
        // Por ahora, simplemente no se aplica este filtro.
      }
    }

    if (filters.startDate) {
      const filterDate = new Date(filters.startDate)
        .toISOString()
        .split("T")[0]; // Convertir a formato YYYY-MM-DD
      currentFilteredOrders = currentFilteredOrders.filter((order) => {
        const orderDate = order.date; // La fecha de la orden ya está en formato YYYY-MM-DD
        return orderDate >= filterDate;
      });
    }

    setFilteredOrders(currentFilteredOrders);
    setCurrentPage(1); // Resetear a la primera página al aplicar filtros
  }, [allOrders, filters, selectorsData.clients]); // Dependencia de selectorsData.clients para el filtro de cliente

  // Paginación
  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredOrders.slice(startIndex, endIndex);
  }, [filteredOrders, currentPage, itemsPerPage]);

  const totalPages = useMemo(() => {
    return Math.ceil(filteredOrders.length / itemsPerPage);
  }, [filteredOrders.length, itemsPerPage]);

  const handlePageChange = useCallback(
    (page: number) => {
      if (page > 0 && page <= totalPages) {
        setCurrentPage(page);
      }
    },
    [totalPages]
  );

  const handleFilterChange = useCallback(
    (newFilters: Partial<OrdersFilter>) => {
      setFilters((prev) => ({ ...prev, ...newFilters }));
    },
    []
  );

  const resetFilters = useCallback(() => {
    setFilters({
      searchQuery: "",
      status: "all",
      clientId: "all",
      startDate: null,
    });
  }, []);

  return {
    orders: paginatedOrders,
    isLoading,
    error,
    filters,
    handleFilterChange,
    resetFilters,
    currentPage,
    totalPages,
    handlePageChange,
    totalOrders: filteredOrders.length,
    clients: selectorsData.clients, // Pasar clientes para el filtro
    refetchOrders: fetchOrders, // Exponer función para recargar órdenes
  };
};
