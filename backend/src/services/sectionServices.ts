import Section from "../models/Section";

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
    console.error("Error al buscar las secciones:", error);
    throw new Error("No fue posible obtener las secciones.");
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
      throw new Error("El nombre no debe estar vacío");
    }

    const client = await Section.findOne({
      where: { name },
    });

    if (client) {
      throw new Error("Ya existe una sección con ese nombre");
    }

    return await Section.create({
      name,
    });
  } catch (error) {
    console.error("Error al crear la sección: ", error);
    throw error;
  }
};

export default {
  getAllSections,
  createSection,
};
