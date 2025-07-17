import { useRef, useEffect, useState } from "react";
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
  const [activeFieldIndex, setActiveFieldIndex] = useState<number>(0);

  // Auto-focus en el primer campo cuando se monta el componente
  useEffect(() => {
    const firstFieldName = campos[0]?.name;
    if (firstFieldName) {
      setTimeout(() => {
        setFocus(firstFieldName as keyof WeightData);
        setActiveFieldIndex(0);
      }, 100);
    }
  }, [setFocus, campos]);

  const navigateToNextField = (currentIndex: number) => {
    if (currentIndex + 1 < campos.length) {
      // Si hay un siguiente campo en el array
      const nextIndex = currentIndex + 1;
      const nextFieldName = campos[nextIndex]?.name;
      setFocus(nextFieldName as keyof WeightData);
      setActiveFieldIndex(nextIndex);
    } else {
      // Si es el último campo, enfocar el botón de enviar
      submitButtonRef.current?.focus();
      setActiveFieldIndex(-1); // Indicar que ningún campo de formulario está activo, sino el botón
    }
  };

  return {
    submitButtonRef,
    navigateToNextField,
    activeFieldIndex,
    setActiveFieldIndex,
  };
};
