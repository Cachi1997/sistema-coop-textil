import { useParams, useNavigate } from "react-router-dom";
import { useOrderEdit } from "../hooks/useOrderEdit";
import { ErrorModal } from "../components/display/ModalNotFound";
import { NotificationModal } from "../components/display/NotificationModal";
import { useNotificationModal } from "../hooks/useNotificationModal";
import { OrderFormField } from "../components/display/forms/OrderFormField";

export const OrderEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const orderEdit = useOrderEdit(id!);
  const notificationModal = useNotificationModal();

  const onSubmit = async (data: any) => {
    try {
      await orderEdit.updateOrder(data);

      notificationModal.showNotification(
        "Orden Actualizada",
        `Orden actualizada exitosamente!\n\nN° Orden: ${data.orderNumber}\nKilos: ${data.kilos} kg`,
        "success",
        3000
      );
    } catch (error: any) {
      console.error("Error al actualizar orden:", error);
      notificationModal.showNotification(
        "Error del Sistema",
        `Ocurrió un error: ${
          error.message || "Error desconocido"
        }. Contacte al administrador.`,
        "error"
      );
    }
  };

  const handleToggleCompletion = async () => {
    try {
      await orderEdit.toggleOrderCompletion();

      notificationModal.showNotification(
        "Estado Actualizado",
        `Orden ${
          orderEdit.isCompleted
            ? "marcada como pendiente"
            : "marcada como completada"
        }`,
        "success",
        3000
      );
    } catch (error: any) {
      console.error("Error al cambiar estado:", error);
      notificationModal.showNotification(
        "Error del Sistema",
        `Error al cambiar estado: ${error.message || "Error desconocido"}`,
        "error"
      );
    }
  };

  if (orderEdit.isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-4 flex items-center justify-center">
        <div className="flex items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-400"></div>
          <span className="ml-3 text-gray-400">Cargando orden...</span>
        </div>
      </div>
    );
  }

  if (orderEdit.error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-4 flex items-center justify-center">
        <div className="bg-red-900 border border-red-500 rounded-lg p-6 max-w-md">
          <h2 className="text-xl font-bold text-red-400 mb-2">Error</h2>
          <p className="text-red-300 mb-4">{orderEdit.error}</p>
          <button
            onClick={() => navigate("/orders")}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
          >
            Volver a Órdenes
          </button>
        </div>
      </div>
    );
  }

  if (!orderEdit.orderData) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-4 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-400 mb-2">
            Orden no encontrada
          </h2>
          <button
            onClick={() => navigate("/orders")}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
          >
            Volver a Órdenes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold text-blue-400">EDITAR ORDEN</h1>
          <p className="text-gray-400">
            Orden #{orderEdit.orderData.orderNumber} - PPE{" "}
            {orderEdit.orderData.ppe}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={handleToggleCompletion}
            disabled={!orderEdit.canEdit}
            className={`px-4 py-2 rounded font-medium transition-colors cursor-pointer  ${
              orderEdit.isCompleted
                ? "bg-yellow-600 hover:bg-yellow-700 text-white"
                : "bg-green-600 hover:bg-green-700 text-white"
            } ${!orderEdit.canEdit ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {orderEdit.isCompleted
              ? "Marcar como Pendiente"
              : "Marcar como Completada"}
          </button>
          <button
            onClick={() => navigate("/orders")}
            className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded cursor-pointer"
          >
            Volver
          </button>
        </div>
      </div>

      {/* Status Badge */}
      <div className="mb-4">
        <span
          className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
            orderEdit.orderData.status === "completada"
              ? "bg-green-900 text-green-300"
              : orderEdit.orderData.status === "cancelada"
              ? "bg-red-900 text-red-300"
              : "bg-yellow-900 text-yellow-300"
          }`}
        >
          {orderEdit.orderData.status.toUpperCase()}
        </span>
      </div>

      {/* Loading State */}
      {orderEdit.isLoadingSelectors && (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
          <span className="ml-3 text-gray-400">
            Cargando datos del formulario...
          </span>
        </div>
      )}

      {/* Error State */}
      {orderEdit.selectorsError && (
        <div className="bg-red-900 border border-red-500 rounded-lg p-4 mb-4">
          <div className="flex items-center">
            <span className="text-red-400 font-bold mr-2">⚠</span>
            <span className="text-red-300">{orderEdit.selectorsError}</span>
          </div>
        </div>
      )}

      {/* Main Content */}
      {!orderEdit.isLoadingSelectors && !orderEdit.selectorsError && (
        <div className="flex-1 flex justify-center">
          <div className="bg-gray-800 rounded-lg p-6 w-2/3 max-w-6xl">
            <h2 className="text-xl font-semibold text-center mb-6 text-blue-400">
              MODIFICAR DATOS DE LA ORDEN
            </h2>

            <form
              onSubmit={orderEdit.form.handleSubmit(onSubmit)}
              className="h-full"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Columna Izquierda */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-center text-blue-400 border-b border-blue-400 pb-2">
                    DATOS PRINCIPALES
                  </h3>
                  <div className="space-y-3">
                    {orderEdit.campos.slice(0, 7).map((campo, index) => (
                      <OrderFormField
                        key={index}
                        campo={campo}
                        index={index}
                        isActive={orderEdit.activeFieldIndex === index}
                        register={orderEdit.form.register}
                        errors={orderEdit.form.formState.errors}
                        onKeyDown={orderEdit.handleEnterKey}
                        selectorsData={orderEdit.selectorsData}
                      />
                    ))}
                  </div>
                </div>

                {/* Columna Derecha */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-center text-purple-400 border-b border-purple-400 pb-2">
                    ESPECIFICACIONES Y DETALLES
                  </h3>
                  <div className="space-y-3">
                    {orderEdit.campos.slice(7, 14).map((campo, index) => {
                      const actualIndex = index + 7;
                      return (
                        <OrderFormField
                          key={actualIndex}
                          campo={campo}
                          index={actualIndex}
                          isActive={orderEdit.activeFieldIndex === actualIndex}
                          register={orderEdit.form.register}
                          errors={orderEdit.form.formState.errors}
                          onKeyDown={orderEdit.handleEnterKey}
                          selectorsData={orderEdit.selectorsData}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Campo Observaciones - Ancho completo */}
              <div className="mt-6">
                <OrderFormField
                  campo={orderEdit.campos[14]}
                  index={14}
                  isActive={orderEdit.activeFieldIndex === 14}
                  register={orderEdit.form.register}
                  errors={orderEdit.form.formState.errors}
                  onKeyDown={orderEdit.handleEnterKey}
                  selectorsData={orderEdit.selectorsData}
                />
              </div>

              {/* Controles Centrados */}
              <div className="mt-8 border-t border-gray-700 pt-6">
                <div className="flex justify-center">
                  <div className="flex gap-6">
                    <button
                      type="submit"
                      disabled={!orderEdit.canEdit}
                      className={`py-3 px-8 rounded-lg font-bold transition-colors text-lg ${
                        orderEdit.canEdit
                          ? "bg-blue-600 hover:bg-blue-700"
                          : "bg-gray-600 cursor-not-allowed opacity-50"
                      }`}
                    >
                      ACTUALIZAR ORDEN
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate(`/orders/${id}`)}
                      className="bg-gray-600 hover:bg-gray-700 py-3 px-8 rounded-lg font-bold transition-colors text-lg"
                    >
                      VER DETALLES
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Error */}
      <ErrorModal
        isOpen={orderEdit.modal.modal.isOpen}
        title={orderEdit.modal.modal.title}
        message={orderEdit.modal.modal.message}
        onClose={orderEdit.modal.closeModal}
      />

      {/* Modal de Notificación */}
      <NotificationModal
        isOpen={notificationModal.notification.isOpen}
        title={notificationModal.notification.title}
        message={notificationModal.notification.message}
        type={notificationModal.notification.type}
        duration={notificationModal.notification.duration}
        onClose={notificationModal.closeNotification}
      />
    </div>
  );
};
