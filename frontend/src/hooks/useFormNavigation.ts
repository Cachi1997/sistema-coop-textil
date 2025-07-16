import { useRef, useEffect } from "react";
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

  // Auto-focus en el primer campo cuando se monta el componente
  useEffect(() => {
    const firstFieldName = campos[0]?.name;
    if (firstFieldName) {
      // Pequeño delay para asegurar que el DOM esté listo
      setTimeout(() => {
        setFocus(firstFieldName as keyof WeightData);
      }, 100);
    }
  }, [setFocus, campos]);

  const navigateToNextField = (currentIndex: number) => {
    const nextFieldName = campos[currentIndex + 1]?.name;
    if (nextFieldName) {
      setFocus(nextFieldName as keyof WeightData);
    } else {
      submitButtonRef.current?.focus();
    }
  };

  return {
    submitButtonRef,
    navigateToNextField,
  };
};
