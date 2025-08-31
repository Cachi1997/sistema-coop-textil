import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDashboardData } from "../hooks/useDashboardData";
import { useDashboardHelpers } from "../hooks/useDashboardHelpers";

export const HomePage = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();

  // Updated to use the simpler useDashboardData hook
  const { data: apiResponse, loading: isLoading, error } = useDashboardData();

  const data = apiResponse?.data || null;

  const { formattedStats, formatPercentage, getPercentageColor } =
    useDashboardHelpers(data);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // BLOQUEAR RENDERIZADO hasta que tengamos datos o error definitivo
  if (isLoading && !data) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-400 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-green-400 mb-2">
            Cargando inicio...
          </h2>
          <p className="text-gray-400">Obteniendo datos del sistema...</p>
        </div>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-red-400 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-red-400 mb-2">
            Error al cargar la página
          </h2>
          <p className="text-gray-400 mb-6">{error}</p>
        </div>
      </div>
    );
  }

  // Actividades recientes mock (ya que el backend devuelve array vacío)
  const recentActivities = [
    {
      id: 1,
      type: "order",
      message: "Nueva orden creada - PPE: 1045",
      time: "Hace 5 minutos",
      icon: "📋",
      color: "text-blue-400",
    },
    {
      id: 2,
      type: "material",
      message: "Ingreso de material - Lote #4001",
      time: "Hace 12 minutos",
      icon: "📥",
      color: "text-cyan-400",
    },
    {
      id: 3,
      type: "dispatch",
      message: "Despacho completado - Orden PPE: 1044",
      time: "Hace 18 minutos",
      icon: "🚚",
      color: "text-orange-400",
    },
  ];

  // Secciones principales
  const mainSections = [
    {
      title: "Gestión de Órdenes",
      description: "Administrar el ciclo completo de órdenes",
      icon: "📋",
      color: "bg-blue-600 hover:bg-blue-700",
      actions: [
        { title: "Crear Orden", path: "/orders/create", icon: "➕" },
        { title: "Ver Órdenes", path: "/orders", icon: "📊" },
        { title: "Modificar Órdenes", path: "/orders/edit", icon: "✏️" },
        { title: "Finalizar Órdenes", path: "/orders/complete", icon: "✅" },
      ],
    },
    {
      title: "Gestión de Materiales",
      description: "Control de inventario y materiales",
      icon: "📦",
      color: "bg-purple-600 hover:bg-purple-700",
      actions: [
        { title: "Ingreso Materiales", path: "/materials/intake", icon: "📥" },
        { title: "Inventario", path: "/materials/inventory", icon: "📋" },
        { title: "Transferencias", path: "/materials/transfers", icon: "🔄" },
        { title: "Control de Stock", path: "/materials/stock", icon: "📊" },
      ],
    },
    {
      title: "Despachos y Entregas",
      description: "Gestión de salidas y entregas",
      icon: "🚚",
      color: "bg-orange-600 hover:bg-orange-700",
      actions: [
        { title: "Nuevo Despacho", path: "/dispatch/new", icon: "🚚" },
        { title: "Historial", path: "/dispatch/history", icon: "📜" },
      ],
    },
    {
      title: "Reportes y Análisis",
      description: "Informes y estadísticas del sistema",
      icon: "📈",
      color: "bg-green-600 hover:bg-green-700",
      actions: [
        { title: "Reporte Diario", path: "/reports/daily", icon: "📊" },
        { title: "Producción", path: "/reports/production", icon: "🏭" },
        { title: "Inventario", path: "/reports/inventory", icon: "📦" },
        { title: "Análisis", path: "/reports/analytics", icon: "📈" },
      ],
    },
  ];

  // Acciones rápidas
  const quickActions = [
    {
      title: "Crear Orden",
      description: "Generar nueva orden",
      icon: "📋",
      color: "bg-blue-600 hover:bg-blue-700",
      path: "/orders/create",
    },
    {
      title: "Ingreso Material",
      description: "Registrar nuevo material",
      icon: "📥",
      color: "bg-purple-600 hover:bg-purple-700",
      path: "/materials/intake",
    },
    {
      title: "Nuevo Despacho",
      description: "Programar despacho",
      icon: "🚚",
      color: "bg-orange-600 hover:bg-orange-700",
      path: "/dispatch/new",
    },
    {
      title: "Ver Inventario",
      description: "Consultar stock actual",
      icon: "📦",
      color: "bg-green-600 hover:bg-green-700",
      path: "/materials/inventory",
    },
  ];

  // SOLO RENDERIZAR CUANDO TENGAMOS DATOS
  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-green-400 mb-2">
              Panel de Control
            </h1>
            <p className="text-gray-400">
              Sistema Integral de Gestión de Producción
            </p>
            {apiResponse?.timestamp && (
              <p className="text-gray-500 text-sm mt-1">
                Última actualización:{" "}
                {new Date(apiResponse.timestamp).toLocaleTimeString()}
                {isLoading && (
                  <span className="ml-2 text-yellow-400">
                    🔄 Actualizando...
                  </span>
                )}
                <span className="ml-2 text-green-400">
                  🌐 Datos de la base de datos
                </span>
              </p>
            )}
            {error && data && (
              <p className="text-red-400 text-sm mt-1">
                ⚠️ Error en última actualización: {error}
              </p>
            )}
          </div>
          <div className="mt-4 sm:mt-0 text-right">
            <div className="text-2xl font-mono text-green-400">
              {currentTime.toLocaleTimeString()}
            </div>
            <div className="text-gray-400">
              {currentTime.toLocaleDateString("es-ES", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {formattedStats?.map((stat, index) => (
          <div
            key={index}
            className={`${stat.bgColor} ${stat.borderColor} border-2 rounded-lg p-6 transition-transform hover:scale-105 cursor-pointer`}
            onClick={() => navigate(stat.clickPath)}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-gray-400 text-sm font-medium">
                  {stat.title}
                </p>
                {stat.subtitle && (
                  <p className="text-gray-500 text-xs mt-1">{stat.subtitle}</p>
                )}
                <p className={`text-3xl font-bold ${stat.color} mt-2`}>
                  {stat.value}
                </p>
              </div>
              <div className="text-4xl ml-2">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Acciones Rápidas */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-green-400 mb-6">
          Acciones Rápidas
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={() => navigate(action.path)}
              className={`${action.color} p-4 rounded-lg text-left transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500`}
            >
              <div className="flex items-center mb-3">
                <span className="text-2xl mr-3">{action.icon}</span>
                <h3 className="font-semibold text-white text-sm">
                  {action.title}
                </h3>
              </div>
              <p className="text-gray-200 text-xs">{action.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Secciones Principales */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-green-400 mb-6">
          Módulos del Sistema
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {mainSections.map((section, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-lg p-6 border border-gray-700"
            >
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-4">{section.icon}</span>
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    {section.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{section.description}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {section.actions.map((action, actionIndex) => (
                  <button
                    key={actionIndex}
                    onClick={() => navigate(action.path)}
                    className="flex items-center p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-left"
                  >
                    <span className="text-lg mr-3">{action.icon}</span>
                    <span className="text-white text-sm font-medium">
                      {action.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Grid de Actividad Reciente y Reportes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Recent Activity */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-green-400 mb-6">
            Actividad Reciente
          </h2>
          <div className="space-y-4 max-h-80 overflow-y-auto">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start space-x-3 p-3 bg-gray-700 rounded-lg"
              >
                <span className="text-xl">{activity.icon}</span>
                <div className="flex-1">
                  <p className="text-white text-sm">{activity.message}</p>
                  <p className="text-gray-400 text-xs mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => navigate("/activity")}
            className="w-full mt-4 text-green-400 hover:text-green-300 text-sm font-medium"
          >
            Ver toda la actividad →
          </button>
        </div>

        {/* Reportes Rápidos */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-green-400 mb-6">
            Reportes Rápidos
          </h2>
          <div className="space-y-3">
            <button
              onClick={() => navigate("/reports/daily")}
              className="w-full flex items-center justify-between p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
            >
              <div className="flex items-center">
                <span className="text-lg mr-3">📊</span>
                <span className="text-white text-sm">Reporte Diario</span>
              </div>
              <span className="text-gray-400">→</span>
            </button>
            <button
              onClick={() => navigate("/reports/production")}
              className="w-full flex items-center justify-between p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
            >
              <div className="flex items-center">
                <span className="text-lg mr-3">🏭</span>
                <span className="text-white text-sm">Producción Semanal</span>
              </div>
              <span className="text-gray-400">→</span>
            </button>
            <button
              onClick={() => navigate("/reports/inventory")}
              className="w-full flex items-center justify-between p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
            >
              <div className="flex items-center">
                <span className="text-lg mr-3">📦</span>
                <span className="text-white text-sm">Estado Inventario</span>
              </div>
              <span className="text-gray-400">→</span>
            </button>
            <button
              onClick={() => navigate("/reports/dispatch")}
              className="w-full flex items-center justify-between p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
            >
              <div className="flex items-center">
                <span className="text-lg mr-3">🚚</span>
                <span className="text-white text-sm">Despachos Pendientes</span>
              </div>
              <span className="text-gray-400">→</span>
            </button>
          </div>
          <button
            onClick={() => navigate("/reports")}
            className="w-full mt-4 text-green-400 hover:text-green-300 text-sm font-medium"
          >
            Ver todos los reportes →
          </button>
        </div>
      </div>
    </div>
  );
};
