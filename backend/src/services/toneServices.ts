import Tone from "../models/Tone";
import { CustomError } from "../utils/CustomError";

/**
 * Devuelve un arreglo de tonos
 *
 * @returns Arreglo de tonos
 */
const getAllTones = async (): Promise<Tone[]> => {
  try {
    const tones = await Tone.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    return tones;
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError(500, `Error al obtener los tonos: ${error.message}`);
  }
};

/**
 * Crea un nuevo tono en la base de datos.
 * @param name - Nombre del tono.
 * @returns El objeto Tono creado.
 * @throws Error si el nombre está vacío.
 * @throws Error si ya existe un tono con ese nombre en la base de datos.
 */
const createTone = async (
  name: string,
  description?: string
): Promise<Tone> => {
  try {
    if (name.trim() === "") {
      throw new CustomError(400, "El nombre no debe estar vacío");
    }

    const tone = await Tone.findOne({
      where: { name },
    });

    if (tone) {
      throw new CustomError(409, `El tono ${name} ya existe`);
    }

    return await Tone.create({
      name,
      description: description || null,
    });
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError(500, `Error al crear el tono: ${error.message}`);
  }
};

export default {
  getAllTones,
  createTone,
};
