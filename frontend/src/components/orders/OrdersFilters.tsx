import { useState, useEffect } from "react";
import type { OrdersFilter, OrderStatus, Client } from "../../types/orders";

interface OrdersFiltersProps {
  filters: OrdersFilter;
  onFilterChange: (newFilters: Partial<OrdersFilter>) => void;
  onResetFilters: () => void;
  clients: Client[];
}

export const OrdersFilters = ({
  filters,
  onFilterChange,
  onResetFilters,
  clients,
}: OrdersFiltersProps) => {
  const [localSearchQuery, setLocalSearchQuery] = useState(filters.searchQuery);
  const [localStatus, setLocalStatus] = useState<OrderStatus | "all">(
    filters.status
  );
  const [localClientId, setLocalClientId] = useState<number | "all">(
    filters.clientId
  );
  const [localStartDate, setLocalStartDate] = useState<string>(
    filters.startDate || ""
  );
  const [localEndDate, setLocalEndDate] = useState<string>(
    filters.endDate || ""
  );

  // Sincronizar filtros locales con los props cuando cambian
  useEffect(() => {
    setLocalSearchQuery(filters.searchQuery);
    setLocalStatus(filters.status);
    setLocalClientId(filters.clientId);
    setLocalStartDate(filters.startDate || "");
    setLocalEndDate(filters.endDate || "");
  }, [filters]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchQuery(e.target.value);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocalStatus(e.target.value as OrderStatus | "all");
  };

  const handleClientChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocalClientId(e.target.value === "all" ? "all" : Number(e.target.value));
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalStartDate(e.target.value);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalEndDate(e.target.value);
  };

  const applyFilters = () => {
    onFilterChange({
      searchQuery: localSearchQuery,
      status: localStatus,
      clientId: localClientId,
      startDate: localStartDate || null,
      endDate: localEndDate || null,
    });
  };

  const resetAll = () => {
    setLocalSearchQuery("");
    setLocalStatus("all");
    setLocalClientId("all");
    setLocalStartDate("");
    setLocalEndDate("");
    onResetFilters();
  };

  const statusOptions: { value: OrderStatus | "all"; label: string }[] = [
    { value: "all", label: "Todos los estados" },
    { value: "pending", label: "Pendiente" },
    { value: "in_progress", label: "En Progreso" },
    { value: "completed", label: "Completada" },
    { value: "cancelled", label: "Cancelada" },
  ];

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md mb-6">
      <h3 className="text-lg font-semibold text-green-400 mb-4">
        Filtros de Órdenes
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {/* Búsqueda General */}
        <div>
          <label
            htmlFor="search"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Buscar (N° Orden, PPE, Cliente, Producto, Color)
          </label>
          <input
            type="text"
            id="search"
            value={localSearchQuery}
            onChange={handleSearchChange}
            placeholder="Buscar órdenes..."
            className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-md text-white focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Filtro por Estado */}
        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Estado
          </label>
          <select
            id="status"
            value={localStatus}
            onChange={handleStatusChange}
            className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-md text-white focus:ring-blue-500 focus:border-blue-500"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Filtro por Cliente */}
        <div>
          <label
            htmlFor="client"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Cliente
          </label>
          <select
            id="client"
            value={localClientId}
            onChange={handleClientChange}
            className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-md text-white focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">Todos los clientes</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name}
              </option>
            ))}
          </select>
        </div>

        {/* Filtro por Fecha de Inicio */}
        <div>
          <label
            htmlFor="startDate"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Fecha Inicio
          </label>
          <input
            type="date"
            id="startDate"
            value={localStartDate}
            onChange={handleStartDateChange}
            className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-md text-white focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Filtro por Fecha Fin */}
        <div>
          <label
            htmlFor="endDate"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Fecha Fin
          </label>
          <input
            type="date"
            id="endDate"
            value={localEndDate}
            onChange={handleEndDateChange}
            className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-md text-white focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end space-x-4">
        <button
          onClick={applyFilters}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 cursor-pointer rounded-md transition-colors"
        >
          Aplicar Filtros
        </button>
        <button
          onClick={resetAll}
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 cursor-pointer rounded-md transition-colors"
        >
          Limpiar Filtros
        </button>
      </div>
    </div>
  );
};
