import { useRef } from "react";
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
