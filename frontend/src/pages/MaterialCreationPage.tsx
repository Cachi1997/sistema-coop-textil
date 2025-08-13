"use client";

import { useState } from "react";
import { useMaterialForm } from "../hooks/useMaterialForm";
import {
  Loader2,
  Package,
  CheckCircle,
  XCircle,
  RotateCcw,
} from "lucide-react";
import type { MaterialPayload } from "../types/orders";
import { MaterialFormField } from "../components/display/forms/MaterialFormField";

export const MaterialCreationPage = () => {
  const {
    form,
    selectorsData,
    isLoadingSelectors,
    selectorsError,
    campos,
    handleEnterKey,
    createMaterial,
    resetForm,
    refetchSelectorsData,
    activeFieldIndex,
  } = useMaterialForm();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const payload: MaterialPayload = {
        ...data,
        timestamp: new Date().toISOString(),
      };

      await createMaterial(payload);
      setSubmitSuccess(true);

      // Limpiar el formulario después de 2 segundos
      setTimeout(() => {
        resetForm();
        setSubmitSuccess(false);
      }, 3000);
    } catch (error: any) {
      setSubmitError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    resetForm();
    setSubmitError(null);
    setSubmitSuccess(false);
  };

  if (isLoadingSelectors) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="flex items-center space-x-2 text-white">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Cargando datos...</span>
        </div>
      </div>
    );
  }

  if (selectorsError) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-gray-800 border border-gray-700 rounded-lg">
          <div className="p-6">
            <div className="flex items-center space-x-2 text-red-400 mb-4">
              <XCircle className="h-6 w-6" />
              <span className="font-medium">Error al cargar datos</span>
            </div>
            <p className="text-gray-300 mb-4">{selectorsError}</p>
            <button
              onClick={refetchSelectorsData}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 flex items-center justify-center"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reintentar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800 border border-gray-700 rounded-lg">
          <div className="border-b border-gray-700 p-6">
            <h1 className="text-white flex items-center space-x-2 text-xl font-semibold">
              <Package className="h-6 w-6" />
              <span>Ingreso de Materiales</span>
            </h1>
          </div>
          <div className="p-6">
            {submitSuccess && (
              <div className="mb-6 border border-green-500 bg-green-500/10 rounded-md p-4 flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <p className="text-green-400">
                  Material creado exitosamente. El formulario se limpiará
                  automáticamente.
                </p>
              </div>
            )}

            {submitError && (
              <div className="mb-6 border border-red-500 bg-red-500/10 rounded-md p-4 flex items-start space-x-2">
                <XCircle className="h-4 w-4 text-red-500 mt-0.5" />
                <p className="text-red-400">Error: {submitError}</p>
              </div>
            )}

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {campos.map((campo, index) => (
                  <MaterialFormField
                    key={campo.name}
                    campo={campo}
                    index={index}
                    isActive={activeFieldIndex === index}
                    register={form.register}
                    errors={form.formState.errors}
                    onKeyDown={handleEnterKey}
                    selectorsData={selectorsData}
                  />
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-700">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Creando Material...
                    </>
                  ) : (
                    <>
                      <Package className="h-4 w-4 mr-2" />
                      Crear Material
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  disabled={isSubmitting}
                  className="flex-1 border border-gray-600 text-gray-300 hover:bg-gray-700 disabled:bg-gray-800 disabled:cursor-not-allowed bg-transparent font-medium py-2 px-4 rounded-md transition-colors duration-200 flex items-center justify-center"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Limpiar Formulario
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
