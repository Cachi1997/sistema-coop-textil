import { useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();

  // Ocultar navbar en la página de pesaje
  const hideNavbar = location.pathname === "/weighing";

  return (
    <div className="min-h-screen bg-gray-900">
      {!hideNavbar && <Navbar currentPath={location.pathname} />}
      <main>{children}</main>
    </div>
  );
};
