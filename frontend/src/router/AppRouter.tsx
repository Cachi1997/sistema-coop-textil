import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { WeighingPage } from "../pages/WeighingPage";
import { CreateOrderPage } from "../pages/CreateOrderPage";
import { HomePage } from "../pages/HomePage";
import { Layout } from "../components/display/layout/Layout";
import { OrdersPage } from "../pages/OrdersPage";
import { OrderDetailPage } from "../pages/OrderDetailPage";
import { OrderEditPage } from "../pages/OrderEditPage";
import { MaterialCreationPage } from "../pages/MaterialCreationPage";
import { TachasListPage } from "../pages/TachasListPage";
import { UtilityPage } from "../pages/UtilityPage";
import WeighingsReportsPage from "../pages/WeighingReportsPage";
import { ActivationPage } from "../pages/ActivationCodePage";

export const AppRouter = () => {
  const [activation, setActivation] = useState<null | {
    code: string;
    type: string;
  }>(null);

  useEffect(() => {
    const saved = localStorage.getItem("activation");
    if (saved) {
      setActivation(JSON.parse(saved));
    }
  }, []);

  if (!activation) {
    return (
      <ActivationPage
        onActivate={() => {
          const saved = localStorage.getItem("activation");
          if (saved) setActivation(JSON.parse(saved));
        }}
      />
    );
  }

  return (
    <BrowserRouter>
      {activation.type === "balance" ? (
        // Solo pesaje
        <Routes>
          <Route path="*" element={<WeighingPage />} />
        </Routes>
      ) : (
        // App normal
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/weighing" element={<WeighingPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/orders/create" element={<CreateOrderPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/orders/:id" element={<OrderDetailPage />} />
            <Route path="/orders/:id/edit" element={<OrderEditPage />} />
            <Route
              path="/materials/create"
              element={<MaterialCreationPage />}
            />
            <Route path="/materials/tachas" element={<TachasListPage />} />
            <Route path="/utilities/:type" element={<UtilityPage />} />
            <Route
              path="/reports/weighing"
              element={<WeighingsReportsPage />}
            />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </Layout>
      )}
    </BrowserRouter>
  );
};
