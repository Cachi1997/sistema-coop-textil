import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const stats = [
    {
      title: "Órdenes Activas",
      value: "18",
      icon: "📋",
      color: "text-blue-400",
      bgColor: "bg-blue-900/20",
      borderColor: "border-blue-500",
    },
    {
      title: "Materiales en Stock",
      value: "156",
      icon: "📦",
      color: "text-green-400",
      bgColor: "bg-green-900/20",
      borderColor: "border-green-500",
    },
    {
      title: "Kilos Procesados",
      value: "2,847.5",
      icon: "⚖️",
      color: "text-yellow-400",
      bgColor: "bg-yellow-900/20",
      borderColor: "border-yellow-500",
    },
    {
      title: "Despachos Pendientes",
      value: "6",
      icon: "🚚",
      color: "text-purple-400",
      bgColor: "bg-purple-900/20",
      borderColor: "border-purple-500",
    },
  ];

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
    {
      id: 4,
      type: "order-completed",
      message: "Orden PPE: 1043 marcada como finalizada",
      time: "Hace 25 minutos",
      icon: "✅",
      color: "text-green-400",
    },
    {
      id: 5,
      type: "inventory",
      message: "Actualización de inventario completada",
      time: "Hace 32 minutos",
      icon: "📊",
      color: "text-purple-400",
    },
  ];

  // Secciones principales organizadas por categorías (sin pesaje)
  const mainSections = [
    {
      title: "Gestión de Órdenes",
      description: "Administrar el ciclo completo de órdenes",
      icon: "📋",
      color: "bg-blue-600 hover:bg-blue-700",
      actions: [
        { title: "Crear Orden", path: "/create-order", icon: "➕" },
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
        { title: "Programar Entregas", path: "/dispatch/schedule", icon: "📅" },
        { title: "Tracking", path: "/dispatch/tracking", icon: "📍" },
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

  // Acciones rápidas más utilizadas (sin pesaje)
  const quickActions = [
    {
      title: "Crear Orden",
      description: "Generar nueva orden",
      icon: "📋",
      color: "bg-blue-600 hover:bg-blue-700",
      path: "/create-order",
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

  // Sección especial para acceso al pesaje (solo visible en ciertas condiciones)
  const showWeighingAccess = () => {
    // Aquí puedes agregar lógica para mostrar el acceso al pesaje
    // Por ejemplo, basado en la configuración del sistema o la URL
    return (
      <div className="bg-gray-800 border-2 border-yellow-500 rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-4xl mr-4">⚖️</span>
            <div>
              <h3 className="text-xl font-semibold text-yellow-400">
                Estación de Pesaje
              </h3>
              <p className="text-gray-400">
                Acceso directo al sistema de pesaje
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate("/weighing")}
            className="bg-yellow-600 hover:bg-yellow-700 px-6 py-3 rounded-lg font-bold transition-colors"
          >
            ACCEDER AL PESAJE
          </button>
        </div>
      </div>
    );
  };

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

      {/* Acceso especial al pesaje (condicional) */}
      {/* Descomenta la siguiente línea si quieres mostrar el acceso al pesaje en ciertas condiciones */}
      {/* {showWeighingAccess()} */}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`${stat.bgColor} ${stat.borderColor} border-2 rounded-lg p-6 transition-transform hover:scale-105 cursor-pointer`}
            onClick={() => {
              if (stat.title.includes("Órdenes")) navigate("/orders");
              if (stat.title.includes("Materiales"))
                navigate("/materials/inventory");
              if (stat.title.includes("Despachos")) navigate("/dispatch/new");
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">
                  {stat.title}
                </p>
                <p className={`text-3xl font-bold ${stat.color} mt-2`}>
                  {stat.value}
                </p>
              </div>
              <div className="text-4xl">{stat.icon}</div>
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

      {/* System Status */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-green-400 mb-6">
          Estado del Sistema
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <div>
              <p className="text-white font-medium">Base de Datos</p>
              <p className="text-green-400 text-sm">Operativa</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <div>
              <p className="text-white font-medium">Servidor</p>
              <p className="text-green-400 text-sm">Estable</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
            <div>
              <p className="text-white font-medium">Red</p>
              <p className="text-yellow-400 text-sm">Carga Media</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <div>
              <p className="text-white font-medium">Almacenamiento</p>
              <p className="text-green-400 text-sm">Disponible</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
