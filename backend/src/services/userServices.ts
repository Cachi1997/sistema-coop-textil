import User from "../models/User";
import { CustomError } from "../utils/CustomError";

const getAllUsers = async () => {
  try {
    const users = await User.findAll();
    return users;
  } catch (error) {
    throw new CustomError(
      500,
      `Error al obtener los usuarios: ${error.message}`
    );
  }
};

const getFullUserByCode = async (code: number) => {
  try {
    const user = await User.findOne({
      where: { code },
      attributes: ["id", "firstName", "lastName", "dni", "code"],
    });

    if (!user) {
      throw new CustomError(404, `Usuario con codigo: ${code} no encontrado`);
    }

    return user;
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError(500, `Error al obtener el usuario: ${error.message}`);
  }
};

const getUserIdByCode = async (code: number): Promise<number> => {
  try {
    const codeNumber = Number(code);
    const user = await User.findOne({
      where: { code: codeNumber },
      attributes: ["id"],
    });

    if (!user) {
      throw new CustomError(404, `Usuario con codigo; ${code} no encontrado`);
    }

    return user.id;
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError(500, `Error al obtener el usuario: ${error.message}`);
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
      throw new CustomError(
        409,
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
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError(500, `Error al crear el usuario: ${error.message}`);
  }
};

const deleteUser = async (id: number): Promise<void> => {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      throw new CustomError(404, `Usuario con id; ${id} no encontrado`);
    }
    user.isActive = false;
    await user.save();
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError(
      500,
      `Error al eliminar el usuario: ${error.message}`
    );
  }
};

export default {
  getAllUsers,
  getFullUserByCode,
  getUserIdByCode,
  createUser,
  deleteUser,
};
