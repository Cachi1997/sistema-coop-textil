import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

interface SubMenuItem {
  id: string;
  label: string;
  path: string;
}

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  path?: string;
  subItems?: SubMenuItem[];
}

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const currentPath = useLocation().pathname;
  const dropdownRef = useRef<HTMLDivElement>(null);

  const menuItems: MenuItem[] = [
    { id: "home", label: "Inicio", icon: "🏠", path: "/" },
    {
      id: "orders",
      label: "Órdenes",
      icon: "📋",
      subItems: [
        { id: "orders-list", label: "Ver Órdenes", path: "/orders" },
        { id: "orders-create", label: "Crear Orden", path: "/orders/create" },
      ],
    },
    {
      id: "materials",
      label: "Materiales",
      icon: "📦",
      subItems: [
        {
          id: "materials-create",
          label: "Crear Material",
          path: "/materials/create",
        },
        { id: "materials-list", label: "Ver Materiales", path: "/materials" },
      ],
    },
    {
      id: "dispatch",
      label: "Despachos",
      icon: "🚚",
      subItems: [
        { id: "dispatch-new", label: "Nuevo Despacho", path: "/dispatch/new" },
        { id: "dispatch-list", label: "Ver Despachos", path: "/dispatch" },
      ],
    },
    { id: "weighing", label: "Pesaje", icon: "⚖️", path: "/weighing" },
    { id: "reports", label: "Reportes", icon: "📈", path: "/reports" },
    { id: "settings", label: "Configuración", icon: "⚙️", path: "/settings" },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isActive = (path: string, id: string) => {
    if (path === "/" && currentPath === "/") {
      return true;
    }
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
    return currentPath === path;
  };

  const handleDropdownToggle = (itemId: string) => {
    setOpenDropdown(openDropdown === itemId ? null : itemId);
  };

  const handleSubItemClick = () => {
    setOpenDropdown(null);
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-gray-800 border-b border-gray-700" ref={dropdownRef}>
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
                <div key={item.id} className="relative">
                  {item.subItems ? (
                    <div>
                      <button
                        onClick={() => handleDropdownToggle(item.id)}
                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center ${
                          isActive("", item.id)
                            ? "bg-green-600 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white"
                        }`}
                      >
                        <span className="mr-2">{item.icon}</span>
                        {item.label}
                        <svg
                          className={`ml-1 h-4 w-4 transition-transform ${
                            openDropdown === item.id ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>

                      {openDropdown === item.id && (
                        <div className="absolute left-0 mt-2 w-48 bg-gray-700 rounded-md shadow-lg z-50 border border-gray-600">
                          <div className="py-1">
                            {item.subItems.map((subItem) => (
                              <Link
                                key={subItem.id}
                                to={subItem.path}
                                onClick={handleSubItemClick}
                                className={`block px-4 py-2 text-sm transition-colors ${
                                  currentPath === subItem.path
                                    ? "bg-green-600 text-white"
                                    : "text-gray-300 hover:bg-gray-600 hover:text-white"
                                }`}
                              >
                                {subItem.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.path!}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActive(item.path!, item.id)
                          ? "bg-green-600 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white"
                      }`}
                    >
                      <span className="mr-2">{item.icon}</span>
                      {item.label}
                    </Link>
                  )}
                </div>
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

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-700">
            {menuItems.map((item) => (
              <div key={item.id}>
                {item.subItems ? (
                  <div>
                    <button
                      onClick={() => handleDropdownToggle(item.id)}
                      className={`w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors flex items-center justify-between ${
                        isActive("", item.id)
                          ? "bg-green-600 text-white"
                          : "text-gray-300 hover:bg-gray-600 hover:text-white"
                      }`}
                    >
                      <span>
                        <span className="mr-2">{item.icon}</span>
                        {item.label}
                      </span>
                      <svg
                        className={`h-4 w-4 transition-transform ${
                          openDropdown === item.id ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {openDropdown === item.id && (
                      <div className="ml-4 mt-1 space-y-1">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.id}
                            to={subItem.path}
                            onClick={handleSubItemClick}
                            className={`block px-3 py-2 rounded-md text-sm transition-colors ${
                              currentPath === subItem.path
                                ? "bg-green-600 text-white"
                                : "text-gray-300 hover:bg-gray-600 hover:text-white"
                            }`}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.path!}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      isActive(item.path!, item.id)
                        ? "bg-green-600 text-white"
                        : "text-gray-300 hover:bg-gray-600 hover:text-white"
                    }`}
                  >
                    <span className="mr-2">{item.icon}</span>
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};
