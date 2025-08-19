import Color from "../models/Color";
import clientServices from "./clientServices";

/**
 * Obtiene todos los colores de la base de datos.
 *
 * @returns Arreglo de colores.
 * @throws Error si ocurre un problema al obtener los clientes.
 */
const getAllColors = async (): Promise<Color[]> => {
  try {
    const colors = await Color.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    return colors;
  } catch (error) {
    throw new Error(`Error fetching colors: ${error.message}`);
  }
};

/**
 * Crea un nuevo Color en la base de datos.
 *
 * @param idColor - ID del Color
 * @param colorName - Nombre del Color
 * @param originalColorName - Nombre original del Color (opcional)
 * @param clientId - ID del cliente propietario del color (opcional)
 * @returns El objeto Color creado
 * @throws Error si ya existe un Color con el id enviado
 * @throws Error si colorName esta vacío
 * @throws Error si se envía clientId y el cliente no existe
 */
const createColor = async (
  idColor: string,
  colorName: string,
  originalColorName?: string,
  clientId?: number
): Promise<Color> => {
  try {
    // Verificar si ya existe un color con ese id
    const existingColor = await Color.findOne({ where: { idColor } });
    if (existingColor) {
      throw new Error(`Ya existe un color con ID: ${idColor}`);
    }

    // Si se envió clientId, verificar que el cliente exista
    if (clientId !== undefined && clientId !== null) {
      const client = await clientServices.getClientById(clientId);
      if (!client) {
        throw new Error(`No existe el cliente con ID: ${clientId}`);
      }
    }

    if (colorName.trim() === "") {
      throw new Error("El color no puede ser vacio");
    }

    // Crear el color
    return await Color.create({
      idColor,
      colorName,
      originalColorName: originalColorName || null,
      clientId: clientId || null,
    });
  } catch (error) {
    console.error("Error al crear el color", error);
    throw error;
  }
};
export default {
  getAllColors,
  createColor,
};
