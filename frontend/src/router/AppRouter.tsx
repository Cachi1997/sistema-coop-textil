import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WeighingPage } from "../pages/WeighingPage";
import { CreateOrderPage } from "../pages/CreateOrderPage";
import { HomePage } from "../pages/HomePage";
import { Layout } from "../components/display/layout/Layout";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/weighing" element={<WeighingPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/create-order" element={<CreateOrderPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};
