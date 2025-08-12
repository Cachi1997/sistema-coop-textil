import { useState } from "react";
import { Link, useLocation } from "react-router-dom"; // Importa Link y useLocation de react-router-dom

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const currentPath = useLocation().pathname; // Usa useLocation para obtener la ruta actual

  const menuItems = [
    { id: "home", label: "Inicio", icon: "🏠", path: "/" },
    { id: "orders", label: "Órdenes", icon: "📋", path: "/orders" },
    {
      id: "materials",
      label: "Materiales",
      icon: "📦",
      path: "/materials/create",
    }, // Cambiar la ruta de materiales para apuntar a crear materiales
    { id: "dispatch", label: "Despachos", icon: "🚚", path: "/dispatch/new" },
    { id: "reports", label: "Reportes", icon: "📈", path: "/reports" },
    { id: "settings", label: "Configuración", icon: "⚙️", path: "/settings" },
    { id: "weighing", label: "Pesaje", icon: "⚖️", path: "/weighing" }, // Añadido de nuevo para que sea accesible
  ];

  const isActive = (path: string, id: string) => {
    // Para la ruta raíz, verifica si la ruta actual es exactamente '/'
    if (path === "/" && currentPath === "/") {
      return true;
    }
    // Para otras rutas, verifica si la ruta actual comienza con la ruta del elemento
    if (id === "orders" && currentPath.startsWith("/orders")) {
      return true;
    }
    if (id === "materials" && currentPath.startsWith("/materials")) {
      return true;
    }
    if (id === "dispatch" && currentPath.startsWith("/dispatch")) {
      return true;
    }
    if (id === "reports" && currentPath.startsWith("/reports")) {
      return true;
    }
    if (id === "settings" && currentPath.startsWith("/settings")) {
      return true;
    }
    if (id === "weighing" && currentPath.startsWith("/weighing")) {
      return true;
    }
    // Para rutas exactas que no son la raíz
    return currentPath === path;
  };

  return (
    <nav className="bg-gray-800 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link
                to="/"
                className="text-xl font-bold text-green-400 hover:text-green-300 transition-colors"
              >
                Sistema Integral
              </Link>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {menuItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.path, item.id)
                      ? "bg-green-600 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span className="sr-only">Abrir menú principal</span>
              {!isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-700">
            {menuItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive(item.path, item.id)
                    ? "bg-green-600 text-white"
                    : "text-gray-300 hover:bg-gray-600 hover:text-white"
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};
