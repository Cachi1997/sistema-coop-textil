import { useMemo } from "react";
import type { DashboardData, SystemStatus } from "../types/dashboard";

export const useDashboardHelpers = (data: DashboardData | null) => {
  // Formatear números con separadores de miles
  const formatNumber = useMemo(
    () => (num: number) => {
      return new Intl.NumberFormat("es-ES").format(num);
    },
    []
  );

  // Formatear kilos con decimales
  const formatKilos = useMemo(
    () => (kilos: number) => {
      return new Intl.NumberFormat("es-ES", {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      }).format(kilos);
    },
    []
  );

  // Formatear porcentajes
  const formatPercentage = useMemo(
    () => (percentage: number) => {
      const sign = percentage >= 0 ? "+" : "";
      return `${sign}${percentage.toFixed(1)}%`;
    },
    []
  );

  // Obtener el color para los porcentajes de cambio
  const getPercentageColor = useMemo(
    () => (percentage: number) => {
      if (percentage > 0) return "text-green-400";
      if (percentage < 0) return "text-red-400";
      return "text-gray-400";
    },
    []
  );

  // Obtener el estado del sistema con colores
  const getSystemStatusColor = useMemo(
    () => (status: SystemStatus[keyof SystemStatus]["status"]) => {
      switch (status) {
        case "online":
          return "bg-green-500";
        case "warning":
          return "bg-yellow-500";
        case "offline":
          return "bg-red-500";
        default:
          return "bg-gray-500";
      }
    },
    []
  );

  // Calcular el progreso de la meta mensual
  const monthlyProgress = useMemo(() => {
    if (
      !data?.production ||
      typeof data.production !== "object" ||
      !("monthly" in data.production)
    )
      return 0;
    const monthly = data.production.monthly;
    if (!monthly) return 0;
    return Math.min((monthly.totalKilos / monthly.monthlyGoal) * 100, 100);
  }, [data]);

  // Obtener estadísticas formateadas para las tarjetas
  const formattedStats = useMemo(() => {
    if (!data?.stats) return null;

    return [
      {
        title: "Órdenes Activas",
        value: formatNumber(data.stats.activeOrders),
        icon: "📋",
        color: "text-blue-400",
        bgColor: "bg-blue-900/20",
        borderColor: "border-blue-500",
        clickPath: "/orders",
      },
      {
        title: "Materiales en Stock",
        value: formatNumber(data.stats.materialsInStock),
        icon: "📦",
        color: "text-green-400",
        bgColor: "bg-green-900/20",
        borderColor: "border-green-500",
        clickPath: "/materials/inventory",
      },
      {
        title: "Kilos del Mes",
        subtitle: `${data.stats.monthlyKilos.month} ${data.stats.monthlyKilos.year}`,
        value: formatKilos(data.stats.monthlyKilos.value),
        icon: "📊",
        color: "text-yellow-400",
        bgColor: "bg-yellow-900/20",
        borderColor: "border-yellow-500",
        clickPath: "/reports/production",
        change: data.stats.monthlyKilos.percentageChange,
      },
      {
        title: "Kilos de la Semana",
        subtitle: data.stats.weeklyKilos.weekRange,
        value: formatKilos(data.stats.weeklyKilos.value),
        icon: "⚖️",
        color: "text-purple-400",
        bgColor: "bg-purple-900/20",
        borderColor: "border-purple-500",
        clickPath: "/reports/production",
        change: data.stats.weeklyKilos.percentageChange,
      },
    ];
  }, [data, formatNumber, formatKilos]);

  // Obtener actividades recientes con iconos y colores
  const formattedActivities = useMemo(() => {
    if (!data?.recentActivities || !Array.isArray(data.recentActivities))
      return [];

    return data.recentActivities.map((activity) => ({
      ...activity,
      formattedTime: activity.timeAgo,
    }));
  }, [data]);

  // Obtener el estado del sistema formateado (ajustado para 'dataBase')
  const formattedSystemStatus = useMemo(() => {
    if (!data?.systemStatus) return [];

    return [
      {
        name: "Base de Datos",
        status: data.systemStatus.dataBase.status, // Cambiado de 'database' a 'dataBase'
        message: data.systemStatus.dataBase.message,
        color: getSystemStatusColor(data.systemStatus.dataBase.status),
      },
      {
        name: "Servidor",
        status: data.systemStatus.server.status,
        message: data.systemStatus.server.message,
        color: getSystemStatusColor(data.systemStatus.server.status),
        details:
          data.systemStatus.server.cpuUsage !== undefined
            ? `CPU: ${data.systemStatus.server.cpuUsage}%`
            : undefined,
      },
      {
        name: "Red",
        status: data.systemStatus.network.status,
        message: data.systemStatus.network.message,
        color: getSystemStatusColor(data.systemStatus.network.status),
        details: data.systemStatus.network.latency
          ? `${data.systemStatus.network.latency}ms`
          : undefined,
      },
      {
        name: "Almacenamiento",
        status: data.systemStatus.storage.status,
        message: data.systemStatus.storage.message,
        color: getSystemStatusColor(data.systemStatus.storage.status),
        details: data.systemStatus.storage.usagePercentage
          ? `${data.systemStatus.storage.usagePercentage}% usado`
          : undefined,
      },
    ];
  }, [data, getSystemStatusColor]);

  return {
    formatNumber,
    formatKilos,
    formatPercentage,
    getPercentageColor,
    getSystemStatusColor,
    monthlyProgress,
    formattedStats,
    formattedActivities,
    formattedSystemStatus,
  };
};
