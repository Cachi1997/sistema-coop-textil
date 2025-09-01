import Client from "../models/Client";
import { CustomError } from "../utils/CustomError";

/**
 * Obtiene todos los clientes de la base de datos.
 * @returns Arreglo de clientes.
 * @throws Error si ocurre un problema al obtener los clientes.
 */
const getAllClients = async (): Promise<Client[]> => {
  try {
    const clients = await Client.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    return clients;
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError(
      500,
      `Error al obtener los clientes: ${error.message}`
    );
  }
};

/**
 * Devuelve un objeto Cliente si lo encuentra o null si no existe
 * @param id - ID del cliente
 * @returns Cliente o null
 */
const getClientById = async (id: number): Promise<Client | null> => {
  try {
    return await Client.findByPk(id);
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError(500, `Error al obtener el usuario: ${error.message}`);
  }
};

/**
 * Busca un cliente por su nombre
 * @param name - Nombre del cliente
 * @return Cliente
 */
const getClientByName = async (name: string): Promise<Client | null> => {
  try {
    if (name.trim() === "") {
      throw new CustomError(400, "El nombre no debe estar vacío");
    }
    return await Client.findOne({ where: { name } });
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError(500, `Error al obtener el usuario: ${error.message}`);
  }
};

/**
 * Crea un nuevo cliente en la base de datos.
 * @param name - Nombre del cliente.
 * @returns El objeto Cliente creado.
 * @throws Error si el nombre está vacío.
 * @throws Error si ya existe un cliente con ese nombre en la base de datos.
 */
const createClient = async (name: string): Promise<Client> => {
  try {
    if (name.trim() === "") {
      throw new CustomError(400, "El nombre no debe estar vacío");
    }

    const client = await Client.findOne({
      where: { name },
    });

    if (client) {
      throw new CustomError(
        409,
        `El cliente ${name} ya existe en la base de datos`
      );
    }

    return await Client.create({
      name,
    });
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError(500, `Error al crear el usuario: ${error.message}`);
  }
};

export default {
  getAllClients,
  createClient,
  getClientById,
  getClientByName,
};
