import { useState, useEffect, useMemo, useCallback } from "react";
import type { OrderListItem, OrdersFilter } from "../types/orders";
import { useSelectorsData } from "./useSelectorsData";
import axios from "../config/axiosInstance";

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
  }, [fetchOrders]);

  // Lógica de filtrado y búsqueda
  useEffect(() => {
    let currentFilteredOrders = allOrders;

    // Filtrar por búsqueda (número de orden, PPE, cliente, producto, color)
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      currentFilteredOrders = currentFilteredOrders.filter(
        (order) =>
          order.orderNumber?.toString().includes(query) ||
          order.ppe?.toString().includes(query) ||
          order.client?.name?.toLowerCase().includes(query) ||
          order.product?.name?.toLowerCase().includes(query) ||
          order.color?.colorName?.toLowerCase().includes(query)
      );
    }

    // Filtrar por cliente
    if (filters.clientId !== "all") {
      if (selectorsData.clients.length > 0) {
        const selectedClient = selectorsData.clients.find(
          (c) => c.id === filters.clientId
        );
        if (selectedClient) {
          currentFilteredOrders = currentFilteredOrders.filter(
            (order) => order.client?.name === selectedClient.name
          );
        }
      }
    }

    // Filtrar por fecha
    if (filters.startDate) {
      const filterDate = new Date(filters.startDate)
        .toISOString()
        .split("T")[0];
      currentFilteredOrders = currentFilteredOrders.filter((order) => {
        const orderDate = order.date;
        return orderDate >= filterDate;
      });
    }

    setFilteredOrders(currentFilteredOrders);
    setCurrentPage(1);
  }, [allOrders, filters, selectorsData.clients]);

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
    clients: selectorsData.clients,
    refetchOrders: fetchOrders,
  };
};
