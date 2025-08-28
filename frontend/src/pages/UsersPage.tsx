import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../config/axiosInstance";
import { ErrorModal } from "../components/display/ModalNotFound";
import { NotificationModal } from "../components/display/NotificationModal";
import { useModal } from "../hooks/useModal";
import { useNotificationModal } from "../hooks/useNotificationModal";
import { usePagination } from "../hooks/usePagination"; // 👈 importar hook genérico

type User = {
  id: number;
  firstName: string;
  lastName: string;
  dni: number;
  code: number;
  isActive: boolean;
};

export const ListUsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const modal = useModal();
  const notificationModal = useNotificationModal();
  const navigate = useNavigate();

  const {
    currentPage,
    totalPages,
    paginatedItems: paginatedUsers,
    handlePageChange,
  } = usePagination(users, 10); // 👈 usar paginación genérica

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get("/users/");
      setUsers(data);
    } catch (error: any) {
      console.error("Error al obtener usuarios:", error);
      modal.showModal(
        "Error",
        error.response?.data?.message || "No se pudieron cargar los usuarios."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Seguro que deseas eliminar este usuario?")) return;

    try {
      await axios.delete(`/users/delete-user/${id}`);
      setUsers((prev) => prev.filter((user) => user.id !== id));

      notificationModal.showNotification(
        "Usuario Eliminado",
        `El usuario con ID ${id} fue eliminado exitosamente.`,
        "success",
        3000
      );
    } catch (error: any) {
      console.error("Error al eliminar usuario:", error);
      modal.showModal(
        "Error al Eliminar",
        error.response?.data?.message || "No se pudo eliminar el usuario."
      );
    }
  };

  if (isLoading) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 text-center text-gray-400">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-400 mx-auto mb-3"></div>
        Cargando usuarios...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-bold text-green-400 mb-6">
        LISTADO DE USUARIOS
      </h1>

      <div className="overflow-x-auto">
        <button
          onClick={() => navigate("/settings/users/create")}
          className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + Nuevo Usuario
        </button>
        <table className="w-full border border-gray-700 rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-green-400">
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Nombre</th>
              <th className="px-4 py-2 text-left">Apellido</th>
              <th className="px-4 py-2 text-left">DNI</th>
              <th className="px-4 py-2 text-left">Código</th>
              <th className="px-4 py-2 text-left">Activo</th>
              <th className="px-4 py-2 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.length > 0 ? (
              paginatedUsers.map((user) => (
                <tr key={user.id} className="border-t border-gray-700">
                  <td className="px-4 py-2">{user.id}</td>
                  <td className="px-4 py-2">{user.firstName}</td>
                  <td className="px-4 py-2">{user.lastName}</td>
                  <td className="px-4 py-2">{user.dni}</td>
                  <td className="px-4 py-2">{user.code}</td>
                  <td className="px-4 py-2">{user.isActive ? "Si" : "No"}</td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-bold text-sm transition-colors"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-6 text-center text-gray-400 italic"
                >
                  No hay usuarios registrados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="flex justify-center items-center mt-4 space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-700 rounded disabled:opacity-50"
        >
          Anterior
        </button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-700 rounded disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>

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
