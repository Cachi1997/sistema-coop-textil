import { useNavigate } from "react-router-dom";
import { useOrdersList } from "../hooks/useOrdersList";
import { OrdersFilters } from "../components/orders/OrdersFilters";
import { OrdersTable } from "../components/orders/OrdersTable";

export const OrdersPage = () => {
  const navigate = useNavigate();
  const {
    orders,
    isLoading,
    error,
    filters,
    handleFilterChange,
    resetFilters,
    currentPage,
    totalPages,
    handlePageChange,
    totalOrders,
    clients,
  } = useOrdersList();

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-green-400">
          Gestión de Órdenes
        </h1>
        <button
          onClick={() => navigate("/create-order")}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 cursor-pointer rounded-md"
        >
          + Nueva Orden
        </button>
      </div>

      {error && (
        <div className="bg-red-900 border border-red-500 rounded-lg p-4 mb-6 text-red-300">
          Error: {error}
        </div>
      )}

      <OrdersFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onResetFilters={resetFilters}
        clients={clients}
      />

      <OrdersTable
        orders={orders}
        isLoading={isLoading}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        totalOrders={totalOrders}
      />
    </div>
  );
};
