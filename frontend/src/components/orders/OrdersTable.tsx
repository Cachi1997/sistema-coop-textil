import { useState } from "react";
import type { OrderListItem } from "../../types/orders";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DeleteOrderModal } from "./DeleteOrderModal";
interface OrdersTableProps {
  orders: OrderListItem[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalOrders: number;
  isLoading: boolean;
  onOrderDeleted: () => void; // Añadido callback para refrescar la lista después de eliminar
}

export const OrdersTable = ({
  orders,
  currentPage,
  totalPages,
  onPageChange,
  totalOrders,
  isLoading,
  onOrderDeleted,
}: OrdersTableProps) => {
  const navigate = useNavigate();
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    orderId: number;
    orderNumber: number;
  }>({
    isOpen: false,
    orderId: 0,
    orderNumber: 0,
  });

  const handleDeleteClick = (orderId: number, orderNumber: number) => {
    setDeleteModal({
      isOpen: true,
      orderId,
      orderNumber,
    });
  };

  const handleCloseDeleteModal = () => {
    setDeleteModal({
      isOpen: false,
      orderId: 0,
      orderNumber: 0,
    });
  };

  const handleDeleteSuccess = () => {
    onOrderDeleted(); // Refrescar la lista de órdenes
  };

  if (isLoading) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 text-center text-gray-400">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-400 mx-auto mb-3"></div>
        Cargando órdenes...
      </div>
    );
  }

  if (orders.length === 0 && totalOrders === 0) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 text-center text-gray-400">
        No se encontraron órdenes.
      </div>
    );
  }

  if (orders.length === 0 && totalOrders > 0) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 text-center text-gray-400">
        No se encontraron órdenes que coincidan con los filtros aplicados.
      </div>
    );
  }

  return (
    <>
      <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-700">
              <tr>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                >
                  ID
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                >
                  PPE
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                >
                  N° Orden
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                >
                  Partida
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                >
                  Fecha
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                >
                  Kilos
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                >
                  Cliente
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                >
                  Producto
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                >
                  Color
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                >
                  Denier
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                >
                  Tono
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                >
                  Material
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                >
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-gray-700 transition-colors"
                >
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-white">
                    {order.id}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                    {order.ppe}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                    {order.orderNumber}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                    {order.batchNumber}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                    {order.date}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                    {Number.parseFloat(order.kilos).toFixed(2)} kg
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                    {order.client?.name ?? "-"}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                    {order.product?.name ?? "—"}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                    {order.color?.colorName ?? "—"}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                    {order.denier?.denier ?? "—"}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                    {order.tone?.name ?? "—"}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                    {order.rawMaterial?.name ?? "—"}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => navigate(`/orders/${order.id}`)}
                      className="text-blue-400 hover:text-blue-300 mr-3"
                    >
                      Ver
                    </button>
                    <button
                      onClick={() => navigate(`/orders/${order.id}/edit`)}
                      className="text-yellow-400 hover:text-yellow-300 mr-3"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() =>
                        handleDeleteClick(Number(order.id), order.orderNumber)
                      }
                      className="text-red-400 hover:text-red-300"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        {totalPages > 1 && (
          <div className="px-4 py-3 flex items-center justify-between border-t border-gray-700 bg-gray-700">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-600 text-sm font-medium rounded-md text-gray-300 bg-gray-800 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-5 w-5" /> Anterior
              </button>
              <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-600 text-sm font-medium rounded-md text-gray-300 bg-gray-800 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Siguiente <ChevronRight className="h-5 w-5" />
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-300">
                  Mostrando{" "}
                  <span className="font-medium">
                    {(currentPage - 1) * 10 + 1}
                  </span>{" "}
                  a{" "}
                  <span className="font-medium">
                    {Math.min(currentPage * 10, totalOrders)}
                  </span>{" "}
                  de <span className="font-medium">{totalOrders}</span>{" "}
                  resultados
                </p>
              </div>
              <div>
                <nav
                  className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                  aria-label="Pagination"
                >
                  <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-600 bg-gray-800 text-sm font-medium text-gray-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="sr-only">Anterior</span>
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        aria-current={currentPage === page ? "page" : undefined}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          currentPage === page
                            ? "z-10 bg-green-600 border-green-500 text-white"
                            : "bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-600"
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}
                  <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-600 bg-gray-800 text-sm font-medium text-gray-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="sr-only">Siguiente</span>
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>

      <DeleteOrderModal
        isOpen={deleteModal.isOpen}
        onClose={handleCloseDeleteModal}
        orderId={deleteModal.orderId}
        orderNumber={deleteModal.orderNumber}
        onDeleteSuccess={handleDeleteSuccess}
      />
    </>
  );
};
