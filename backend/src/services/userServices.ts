import User from "../models/User";

const getAllUsers = async () => {
  try {
    const users = await User.findAll();
    return users;
  } catch (error) {
    throw new Error(`Error fetching users: ${error.message}`);
  }
};

const getFullUserByCode = async (code: number) => {
  try {
    const user = await User.findOne({
      where: { code },
      attributes: ["idUser", "firstName", "lastName", "dni", "code"],
    });
    if (!user) {
      throw new Error(`User with ID ${code} not found`);
    }
    return user;
  } catch (error) {
    throw new Error(`Error fetching user: ${error.message}`);
  }
};

const getUserIdByCode = async (code: string): Promise<number> => {
  try {
    const codeNumber = Number(code);
    const user = await User.findOne({
      where: { code: codeNumber },
      attributes: ["idUser"],
    });
    if (!user) {
      throw new Error(`Usuario con codigo; ${code} no encontrado`);
    }
    return user.idUser;
  } catch (error) {
    console.error("Error al buscar el usuario:", error);
    throw new Error("No fue posible encontrar el usuario.");
  }
};

export default {
  getAllUsers,
  getFullUserByCode,
  getUserIdByCode,
};
