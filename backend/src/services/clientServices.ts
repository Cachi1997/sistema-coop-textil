import Client from "../models/Client";

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
    throw new Error(`Error al obtener clientes: ${error.message}`);
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
    console.error("Ocurrio un error al obtener el cliente:", error);
    throw error;
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
      throw new Error("El nombre no debe estar vacío");
    }

    const client = await Client.findOne({
      where: { name },
    });

    if (client) {
      throw new Error("Ya existe un cliente con ese nombre");
    }

    return await Client.create({
      name,
    });
  } catch (error) {
    console.error("Error al crear el cliente: ", error);
    throw error;
  }
};

export default {
  getAllClients,
  createClient,
  getClientById,
};
