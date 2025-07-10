import { useState } from "react";
import type { User } from "../types";
import axios from "../config/axiosInstance";

export const useUserValidation = () => {
  const [user, setUser] = useState<User>({
    id: 0,
    name: "",
    lastName: "",
    dni: 0,
    code: 0,
  });

  const verificarUsuario = async (code: number): Promise<User> => {
    try {
      const res = await axios.get(`/users/${code}`);
      const userData: User = res.data;
      setUser(userData);
      return userData;
    } catch (error) {
      console.error("Error al verificar usuario:", error);
      return { id: 0, name: "", lastName: "", dni: 0, code: 0 };
    }
  };

  return {
    user,
    verificarUsuario,
  };
};
