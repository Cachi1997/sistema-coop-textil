import Color from "../models/Color";
import { CustomError } from "../utils/CustomError";
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
    throw new CustomError(
      500,
      `Error al obtener los colores: ${error.message}`
    );
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
    // Si se envió clientId, verificar que el cliente exista
    if (clientId !== undefined && clientId !== null) {
      const client = await clientServices.getClientById(clientId);
      if (!client) {
        throw new CustomError(404, `Cliente con id ${clientId} no encontrado`);
      }
    }

    if (colorName.trim() === "") {
      throw new CustomError(400, "El nombre del color no puede estar vacío");
    }

    // Crear el color
    return await Color.create({
      idColor,
      colorName,
      originalColorName: originalColorName || null,
      clientId: clientId || null,
    });
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError(500, `Error al crear el color: ${error.message}`);
  }
};
export default {
  getAllColors,
  createColor,
};
