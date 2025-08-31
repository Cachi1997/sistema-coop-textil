import Tone from "../models/Tone";

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
    throw new Error(`Error al obtener los tonos: ${error.message}`);
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
      throw new Error("El nombre no debe estar vacío");
    }

    const tone = await Tone.findOne({
      where: { name },
    });

    if (tone) {
      throw new Error("Ya existe un tono con ese nombre");
    }

    return await Tone.create({
      name,
      description: description || null,
    });
  } catch (error) {
    console.error("Error al crear el tono: ", error);
    throw error;
  }
};

export default {
  getAllTones,
  createTone,
};
