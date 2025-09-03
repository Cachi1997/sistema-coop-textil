import { useState } from "react";
import axios from "../config/axiosInstance";
import { ErrorModal } from "../components/display/ModalNotFound";
import { NotificationModal } from "../components/display/NotificationModal";
import { useModal } from "../hooks/useModal";
import { useNotificationModal } from "../hooks/useNotificationModal";

export const PPEPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const modal = useModal();
  const notificationModal = useNotificationModal();

  const handleResetPPE = async () => {
    if (!confirm("¿Está seguro de que desea resetear el PPE?")) return;

    try {
      setIsLoading(true);
      await axios.post("/utilities/resetPPE");

      notificationModal.showNotification(
        "PPE Reseteado",
        "El PPE se ha reseteado correctamente.",
        "success",
        3000
      );
    } catch (error: any) {
      console.error("Error al resetear PPE:", error);
      modal.showModal(
        "Error",
        error.response?.data?.message || "No se pudo resetear el PPE."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold text-green-400 mb-6">Resetear PPE</h1>

      <p className="text-gray-300 mb-4 text-center max-w-md">
        Haga click si desea volver a cero el PPE en caso de ser un nuevo año.
      </p>

      <button
        onClick={handleResetPPE}
        disabled={isLoading}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-lg font-bold transition-colors"
      >
        {isLoading ? "Reseteando..." : "Resetear"}
      </button>

      {/* Modal de Error */}
      <ErrorModal
        isOpen={modal.modal.isOpen}
        title={modal.modal.title}
        message={modal.modal.message}
        onClose={modal.closeModal}
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
