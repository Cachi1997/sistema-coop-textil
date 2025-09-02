import Section from "../models/Section";
import { CustomError } from "../utils/CustomError";

/**
 * Devuelve un arreglo de secciones
 *
 * @returns Arreglo de secciones
 */
const getAllSections = async () => {
  try {
    const sections = await Section.findAll({
      attributes: ["id", "name"],
    });
    return sections;
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError(
      500,
      `Error al obtener las secciones: ${error.message}`
    );
  }
};

/**
 * Crea una nueva sección en la base de datos.
 * @param name - Nombre de la sección.
 * @returns El objeto Seccion creado.
 * @throws Error si el nombre está vacío.
 * @throws Error si ya existe una sección con ese nombre en la base de datos.
 */
const createSection = async (name: string): Promise<Section> => {
  try {
    if (name.trim() === "") {
      throw new CustomError(400, "El nombre no debe estar vacío");
    }

    const client = await Section.findOne({
      where: { name },
    });

    if (client) {
      throw new CustomError(409, `La sección ${name} ya existe`);
    }

    return await Section.create({
      name,
    });
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError(500, `Error al crear la seccion: ${error.message}`);
  }
};

export default {
  getAllSections,
  createSection,
};
