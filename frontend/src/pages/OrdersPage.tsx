import { useOrdersList } from "../hooks/useOrdersList";
import { OrdersFilters } from "../components/orders/OrdersFilters";
import { OrdersTable } from "../components/orders/OrdersTable";

export const OrdersPage = () => {
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
      <h1 className="text-3xl font-bold text-green-400 mb-6">
        Gestión de Órdenes
      </h1>

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
