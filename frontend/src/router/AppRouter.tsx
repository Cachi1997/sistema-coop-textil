import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WeighingPage } from "../pages/WeighingPage";
import { CreateOrderPage } from "../pages/CreateOrderPage";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreateOrderPage />} />
        <Route path="/weighing" element={<WeighingPage />} />
        <Route path="/create-order" element={<CreateOrderPage />} />
      </Routes>
    </BrowserRouter>
  );
};
