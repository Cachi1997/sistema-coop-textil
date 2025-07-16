import WeightDisplay from "../components/display/WeightDisplay";
import { useWeightSocket } from "../hooks/useWeightSocket";
import { LabelDisplay } from "../components/display/LabelDisplay";
import { useWeighingForm } from "../hooks/useWeighingForm";
import { useWeightCalculations } from "../hooks/useWeightCalculations";
import { ErrorModal } from "../components/display/ModalNotFound";
import { OrderDataWeightDisplay } from "../components/display/OrderDataWeightDisplay";

export const WeighingPage = () => {
  const grossWeight = useWeightSocket();
  const weighingForm = useWeighingForm();

  // Calcular peso neto
  const internalTare = weighingForm.form.watch("internalTare") || 0;
  const externalTare = weighingForm.form.watch("externalTare") || 0;
  const { netWeight } = useWeightCalculations({
    grossWeight,
    internalTare,
    externalTare,
  });

  const onSubmit = (data: any) => {
    weighingForm.registerWeight(data, netWeight);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-2 sm:p-4 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-2 sm:mb-4">
        <h1 className="text-xl sm:text-2xl font-bold text-green-400">
          SISTEMA DE PESAJE
        </h1>
        <div className="text-sm sm:text-xl text-right">
          <div className="text-green-400">
            Usuario: {weighingForm.user.name} {weighingForm.user.lastName}
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
        {/* Columna 1: Peso actual y, condicionalmente, Detalles de la Orden */}
        <div className="bg-gray-800 rounded-lg p-2 sm:p-4 flex flex-col">
          <h2 className="text-base sm:text-lg font-semibold text-center mb-2 text-green-400">
            PESO ACTUAL
          </h2>
          <WeightDisplay grossWeight={grossWeight} netWeight={netWeight} />

          {/* Detalles de la Orden para monitores 4:3 (md y abajo) */}
          {/* Se muestra en pantallas pequeñas/medianas y se oculta en pantallas grandes */}
          <div className="mt-4 lg:hidden">
            <h2 className="text-base sm:text-lg font-semibold text-center mb-2 text-green-400">
              DETALLES DE LA ORDEN
            </h2>
            <OrderDataWeightDisplay orderData={weighingForm.orderData} />
          </div>
        </div>

        {/* Columna 2: Formulario */}
        <div className="bg-gray-800 rounded-lg p-2 sm:p-4">
          <h2 className="text-base sm:text-lg font-semibold text-center mb-2 text-green-400">
            DATOS DE REGISTRO
          </h2>
          <form
            onSubmit={weighingForm.form.handleSubmit(onSubmit)}
            className="space-y-2 sm:space-y-3"
          >
            {weighingForm.campos.map((campo, index) => (
              <div
                key={index}
                className="p-2 sm:p-3 mb-1 sm:mb-2 rounded-lg border-2 border-gray-600 bg-gray-750"
              >
                <LabelDisplay
                  message={campo.label}
                  className="block text-xs sm:text-sm font-medium mb-1 text-gray-300"
                />
                <input
                  type={campo.type}
                  {...weighingForm.form.register(campo.name as any, {
                    required:
                      campo.name !== "internalTare" &&
                      campo.name !== "externalTare",
                    valueAsNumber: campo.type === "number",
                    min:
                      (campo.name === "internalTare" ||
                        campo.name === "externalTare") &&
                      campo.type === "number"
                        ? { value: 0, message: "No puede ser negativo" }
                        : undefined,
                  })}
                  onKeyDown={(e) => weighingForm.handleEnterKey(e, index)}
                  className={`w-full px-2 py-1 sm:px-3 sm:py-2 bg-gray-900 border border-gray-600 rounded text-sm sm:text-base text-white focus:border-green-500 focus:outline-none ${
                    weighingForm.form.formState.errors[
                      campo.name as keyof typeof weighingForm.form.formState.errors
                    ]
                      ? "border-red-500"
                      : ""
                  }`}
                />
                {weighingForm.form.formState.errors[
                  campo.name as keyof typeof weighingForm.form.formState.errors
                ] && (
                  <span className="text-red-500 text-xs mt-1">
                    {weighingForm.form.formState.errors[
                      campo.name as keyof typeof weighingForm.form.formState.errors
                    ]?.message || "Este campo es obligatorio"}
                  </span>
                )}
              </div>
            ))}
            <input
              type="submit"
              ref={weighingForm.navigation.submitButtonRef}
              className="bg-green-500 hover:bg-green-600 text-white font-bold mt-2 py-2 px-4 rounded w-full text-sm sm:text-base"
              value="Enviar"
            />
            {/* Nuevo botón de Reset */}
            <button
              type="button" // Importante: type="button" para evitar que envíe el formulario
              onClick={weighingForm.resetForm}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full text-sm sm:text-base mt-1"
            >
              Resetear Formulario
            </button>
          </form>
        </div>

        {/* Columna 3: Detalles de la Orden para monitores anchos (lg y arriba) */}
        {/* Se oculta en pantallas pequeñas/medianas y se muestra en pantallas grandes */}
        <div className="bg-gray-800 rounded-lg p-2 sm:p-4 hidden lg:block">
          <h2 className="text-base sm:text-lg font-semibold text-center mb-2 text-green-400">
            DETALLES DE LA ORDEN
          </h2>
          <OrderDataWeightDisplay orderData={weighingForm.orderData} />
        </div>
      </div>

      {/* Modal de Error */}
      <ErrorModal
        isOpen={weighingForm.modal.modal.isOpen}
        title={weighingForm.modal.modal.title}
        message={weighingForm.modal.modal.message}
        onClose={weighingForm.modal.closeModal}
      />
    </div>
  );
};
