import { useForm } from "react-hook-form";
import axios from "../config/axiosInstance";
import { ErrorModal } from "../components/display/ModalNotFound";
import { NotificationModal } from "../components/display/NotificationModal";
import { useModal } from "../hooks/useModal";
import { useNotificationModal } from "../hooks/useNotificationModal";
import { OrderFormField } from "../components/display/forms/OrderFormField";

type UserFormData = {
  firstName: string;
  lastName: string;
  dni: number;
  code: number;
};

export const CreateUserPage = () => {
  const form = useForm<UserFormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      dni: undefined,
      code: undefined,
    },
  });

  const modal = useModal();
  const notificationModal = useNotificationModal();

  const campos = [
    { name: "firstName", label: "Nombre", type: "text" },
    { name: "lastName", label: "Apellido", type: "text" },
    { name: "dni", label: "DNI", type: "number" },
    {
      name: "code",
      label: "Código de Usuario (Ultimos 4 dígitos del DNI)",
      type: "number",
    },
  ];

  const onSubmit = async (data: UserFormData) => {
    try {
      await axios.post("/users/create-user", data);

      notificationModal.showNotification(
        "Usuario Creado",
        `El usuario ${data.firstName} ${data.lastName} fue creado exitosamente.`,
        "success",
        4000
      );

      form.reset();
    } catch (error: any) {
      console.error("Error al crear usuario:", error);
      modal.showModal(
        "Error al Crear Usuario",
        error.response?.data?.message || "Error desconocido."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-green-400">
          CREACIÓN DE USUARIOS
        </h1>
      </div>

      <div className="flex-1 flex justify-center pb-8">
        <div className="bg-gray-800 rounded-lg p-6 w-2/3 max-w-2xl">
          <h2 className="text-xl font-semibold text-center mb-6 text-green-400">
            NUEVO USUARIO
          </h2>

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="h-full space-y-4"
          >
            {campos.map((campo, index) => (
              <OrderFormField
                key={index}
                campo={campo}
                index={index}
                isActive={false}
                register={form.register}
                errors={form.formState.errors}
                onKeyDown={() => {}}
                selectorsData={{} as any} // no aplica en usuarios
              />
            ))}

            <div className="mt-8 border-t border-gray-700 pt-6 flex justify-center gap-6">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 py-3 px-8 rounded-lg font-bold transition-colors text-lg cursor-pointer"
              >
                CREAR USUARIO
              </button>
              <button
                type="button"
                onClick={() => form.reset()}
                className="bg-red-600 hover:bg-red-700 py-3 px-8 cursor-pointer rounded-lg font-bold transition-colors text-lg"
              >
                LIMPIAR
              </button>
            </div>
          </form>
        </div>
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
