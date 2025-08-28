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
      attributes: ["id"],
    });
    if (!user) {
      throw new Error(`Usuario con codigo; ${code} no encontrado`);
    }
    return user.id;
  } catch (error) {
    console.error("Error al buscar el usuario:", error);
    throw new Error("No fue posible encontrar el usuario.");
  }
};

const createUser = async (
  firstName: string,
  lastName: string,
  dni: number,
  code: number
): Promise<User> => {
  try {
    const existingUser = await User.findOne({ where: { dni } });
    if (existingUser) {
      throw new Error(
        `El usuario con dni ${dni} ya existe en la base de datos`
      );
    }
    return await User.create({
      firstName,
      lastName,
      dni,
      code,
      isActive: true,
    });
  } catch (error) {
    throw new Error(`Error al crear el usuario ${error.message}`);
  }
};

const deleteUser = async (idUser: number): Promise<void> => {
  try {
    const user = await User.findByPk(idUser);
    if (!user) {
      throw new Error(`Usuario con id; ${idUser} no encontrado`);
    }
    user.isActive = false;
    await user.save();
  } catch (error) {
    throw new Error(`Error al eliminar el usuario ${error.message}`);
  }
};

export default {
  getAllUsers,
  getFullUserByCode,
  getUserIdByCode,
  createUser,
  deleteUser,
};
