"use client";

import { useRef, useEffect, useState } from "react"; // Import useState
import type { UseFormSetFocus } from "react-hook-form";
import type { WeightData } from "../types";

interface UseFormNavigationProps {
  setFocus: UseFormSetFocus<WeightData>;
  campos: Array<{ name: string; label: string; type: string }>;
}

export const useFormNavigation = ({
  setFocus,
  campos,
}: UseFormNavigationProps) => {
  const submitButtonRef = useRef<HTMLInputElement | null>(null);
  const [activeFieldIndex, setActiveFieldIndex] = useState<number>(0); // Nuevo estado para el índice activo

  // Auto-focus en el primer campo cuando se monta el componente
  useEffect(() => {
    const firstFieldName = campos[0]?.name;
    if (firstFieldName) {
      setTimeout(() => {
        setFocus(firstFieldName as keyof WeightData);
        setActiveFieldIndex(0); // Establecer el primer campo como activo inicialmente
      }, 100);
    }
  }, [setFocus, campos]);

  const navigateToNextField = (currentIndex: number) => {
    const nextIndex = (currentIndex + 1) % campos.length; // Calcular el siguiente índice
    const nextFieldName = campos[nextIndex]?.name;
    if (nextFieldName) {
      setFocus(nextFieldName as keyof WeightData);
      setActiveFieldIndex(nextIndex); // Actualizar el índice del campo activo
    } else {
      submitButtonRef.current?.focus();
      setActiveFieldIndex(-1); // Indicar que ningún campo está activo (ej. el botón de enviar)
    }
  };

  return {
    submitButtonRef,
    navigateToNextField,
    activeFieldIndex, // Exponer el índice del campo activo
    setActiveFieldIndex, // Exponer el setter para casos como el reset
  };
};
