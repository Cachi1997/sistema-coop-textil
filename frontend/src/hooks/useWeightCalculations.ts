import { useMemo } from "react";

interface UseWeightCalculationsProps {
  grossWeight: number | null;
  internalTare: number;
  externalTare: number;
}

export const useWeightCalculations = ({
  grossWeight,
  internalTare,
  externalTare,
}: UseWeightCalculationsProps) => {
  const netWeight = useMemo(() => {
    return grossWeight !== null
      ? grossWeight - internalTare - externalTare
      : null;
  }, [grossWeight, internalTare, externalTare]);

  return {
    netWeight,
  };
};
