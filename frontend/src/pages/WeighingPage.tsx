import WeightDisplay from "../components/display/WeightDisplay";
import { useWeightSocket } from "../hooks/useWeightSocket";
import { LabelDisplay } from "../components/display/LabelDisplay";
import { useWeighingForm } from "../hooks/useWeighingForm";
import { useWeightCalculations } from "../hooks/useWeightCalculations";
import { ErrorModal } from "../components/display/ModalNotFound";

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
    <div className="h-screen bg-gray-900 text-white p-4 overflow-y-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-green-400">SISTEMA DE PESAJE</h1>
        <div className="text-right text-sm">
          <div className="text-green-400">
            Usuario: {weighingForm.user.name} {weighingForm.user.lastName}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 h-[calc(100vh-120px)]">
        {/* Columna 1: Peso actual */}
        <div className="bg-gray-800 rounded-lg p-4 flex flex-col">
          <h2 className="text-lg font-semibold text-center mb-3 text-green-400">
            PESO ACTUAL
          </h2>
          <WeightDisplay grossWeight={grossWeight} netWeight={netWeight} />
        </div>

        {/* Columna 2: Formulario */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h2 className="text-lg font-semibold text-center mb-3 text-green-400">
            DATOS DE REGISTRO
          </h2>
          <form
            onSubmit={weighingForm.form.handleSubmit(onSubmit)}
            className="space-y-3"
          >
            {weighingForm.campos.map((campo, index) => (
              <div
                key={index}
                className="p-3 mb-2 rounded-lg border-2 border-gray-600 bg-gray-750"
              >
                <LabelDisplay
                  message={campo.label}
                  className="block text-sm font-medium mb-1 text-gray-300"
                />
                <input
                  type={campo.type}
                  {...weighingForm.form.register(campo.name as any, {
                    required:
                      campo.name !== "internalTare" &&
                      campo.name !== "externalTare",
                    valueAsNumber: campo.type === "number",
                  })}
                  onKeyDown={(e) => weighingForm.handleEnterKey(e, index)}
                  className={`w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded text-white focus:border-green-500 focus:outline-none ${
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
                    Este campo es obligatorio
                  </span>
                )}
              </div>
            ))}
            <input
              type="submit"
              ref={weighingForm.navigation.submitButtonRef}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-full"
              value="Enviar"
            />
          </form>
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
