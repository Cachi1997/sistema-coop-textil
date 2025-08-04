import { useOrderForm } from "../hooks/useOrderForm";
import { ErrorModal } from "../components/display/ModalNotFound";
import { NotificationModal } from "../components/display/NotificationModal";
import { useNotificationModal } from "../hooks/useNotificationModal";
import type { OrderFormData, OrderPayload } from "../types/orders";
import { OrderFormField } from "../components/display/forms/OrderFormField";

export const CreateOrderPage = () => {
  const orderForm = useOrderForm();
  const notificationModal = useNotificationModal();

  const onSubmit = async (data: OrderFormData) => {
    try {
      // Validaciones adicionales si es necesario
      if (data.kilos <= 0) {
        orderForm.modal.showModal(
          "Error de Validación",
          "Los kilos deben ser mayor a 0."
        );
        return;
      }

      // Preparar los datos para enviar al backend
      const orderPayload: OrderPayload = {
        ...data,
        timestamp: new Date().toISOString(),
      };

      // Llamar a la función createOrder del hook
      await orderForm.createOrder(orderPayload);

      // Si la promesa se resuelve (éxito)
      notificationModal.showNotification(
        "Orden Creada",
        `Orden creada exitosamente!\n\nPPE: ${data.ppe}\nN° Orden: ${data.orderNumber}\nKilos: ${data.kilos} kg`,
        "success",
        5000
      );

      // Resetear el formulario después del éxito
      // Nota: El PPE ya se habrá actualizado automáticamente en createOrder
      orderForm.resetForm();
    } catch (error: any) {
      console.error("Error al crear orden:", error);
      notificationModal.showNotification(
        "Error del Sistema",
        `Ocurrió un error: ${
          error.message || "Error desconocido"
        }. Contacte al administrador.`,
        "error"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-green-400">
          CREACIÓN DE ÓRDENES
        </h1>
        <div className="text-right">
          <div className="text-green-400">
            Próximo PPE:{" "}
            {orderForm.isLoadingPPE ? "Cargando..." : orderForm.nextPPE}
          </div>
          <div className="text-gray-400 text-sm">
            (Último PPE del backend: {orderForm.currentPPE})
          </div>
          {orderForm.ppeError && (
            <div className="text-red-400 text-sm">
              Error: {orderForm.ppeError}
            </div>
          )}
        </div>
      </div>

      {/* Loading State */}
      {orderForm.isLoadingSelectors && (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-400"></div>
          <span className="ml-3 text-gray-400">
            Cargando datos del formulario...
          </span>
        </div>
      )}

      {/* Error State */}
      {orderForm.selectorsError && (
        <div className="bg-red-900 border border-red-500 rounded-lg p-4 mb-4">
          <div className="flex items-center">
            <span className="text-red-400 font-bold mr-2">⚠</span>
            <span className="text-red-300">{orderForm.selectorsError}</span>
            <button
              onClick={orderForm.refetchSelectorsData}
              className="ml-auto bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
            >
              Reintentar
            </button>
          </div>
        </div>
      )}

      {/* Main Content - Single Container with 2 Columns */}
      {!orderForm.isLoadingSelectors && !orderForm.selectorsError && (
        <div className="flex-1 flex justify-center pb-8">
          <div className="bg-gray-800 rounded-lg p-6 w-2/3 max-w-6xl">
            <h2 className="text-xl font-semibold text-center mb-6 text-green-400">
              NUEVA ÓRDEN
            </h2>

            <form
              onSubmit={orderForm.form.handleSubmit(onSubmit)}
              className="h-full"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Columna Izquierda */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-center text-blue-400 border-b border-blue-400 pb-2">
                    DATOS PRINCIPALES
                  </h3>
                  <div className="space-y-3">
                    {orderForm.campos.slice(0, 7).map((campo, index) => (
                      <OrderFormField
                        key={index}
                        campo={campo}
                        index={index}
                        isActive={orderForm.activeFieldIndex === index}
                        register={orderForm.form.register}
                        errors={orderForm.form.formState.errors}
                        onKeyDown={orderForm.handleEnterKey}
                        selectorsData={orderForm.selectorsData}
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
                    {/* Campos normales de la columna derecha (sin observaciones) */}
                    {orderForm.campos.slice(7, 14).map((campo, index) => {
                      const actualIndex = index + 7;
                      return (
                        <OrderFormField
                          key={actualIndex}
                          campo={campo}
                          index={actualIndex}
                          isActive={orderForm.activeFieldIndex === actualIndex}
                          register={orderForm.form.register}
                          errors={orderForm.form.formState.errors}
                          onKeyDown={orderForm.handleEnterKey}
                          selectorsData={orderForm.selectorsData}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Campo Observaciones - Ancho completo */}
              <div className="mt-6">
                <OrderFormField
                  campo={orderForm.campos[14]} // Observaciones es el último campo (índice 14)
                  index={14}
                  isActive={orderForm.activeFieldIndex === 14}
                  register={orderForm.form.register}
                  errors={orderForm.form.formState.errors}
                  onKeyDown={orderForm.handleEnterKey}
                  selectorsData={orderForm.selectorsData}
                />
              </div>

              {/* Controles Centrados */}
              <div className="mt-8 border-t border-gray-700 pt-6">
                <div className="flex justify-center">
                  <div className="flex gap-6">
                    <button
                      type="submit"
                      className="bg-green-600 hover:bg-green-700 py-3 px-8 rounded-lg font-bold transition-colors text-lg cursor-pointer"
                    >
                      CREAR ORDEN
                    </button>
                    <button
                      type="button"
                      onClick={orderForm.resetForm}
                      className="bg-red-600 hover:bg-red-700 py-3 px-8 cursor-pointer rounded-lg font-bold transition-colors text-lg"
                    >
                      LIMPIAR
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
        isOpen={orderForm.modal.modal.isOpen}
        title={orderForm.modal.modal.title}
        message={orderForm.modal.modal.message}
        onClose={orderForm.modal.closeModal}
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
