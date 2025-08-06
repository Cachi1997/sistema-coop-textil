import { useState, useEffect } from "react";
import axios from "../config/axiosInstance";
import type { DashboardApiResponse, DashboardData } from "../types/dashboard";

export const useDashboardData = () => {
  const [data, setData] = useState<DashboardApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      setLoading(true);
      setError(null);
      try {
        let responseData: DashboardApiResponse;
        const response = await axios.get<DashboardApiResponse>(
          "utilities/dashboard/summary"
        );
        responseData = response.data;
        setData(responseData);
      } catch (err: any) {
        console.error("Error al obtener el estado del sistema:", err);
        setError(
          err.response?.data?.message ||
            err.message ||
            "Error al obtener el estado del sistema"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchStatus();
  }, []); // Dependencia para re-ejecutar si useMockData cambia

  return { data, loading, error };
};
