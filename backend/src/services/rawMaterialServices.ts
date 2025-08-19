import RawMaterial from "../models/RawMaterial";

/**
 * Devuelve un arreglo de Materia Prima
 *
 * @returns Arreglo de materia prima
 */
const getAllRawMaterials = async (): Promise<RawMaterial[]> => {
  try {
    const rawMaterials = await RawMaterial.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    return rawMaterials;
  } catch (error) {
    throw new Error(`Error fetching raw materials: ${error.message}`);
  }
};

/**
 * Crea una nueva materia prima en la base de datos.
 * @param name - Nombre de la materia prima
 * @returns El objeto Tone creado.
 * @throws Error si el nombre está vacío.
 * @throws Error si ya existe una materia prima con ese nombre en la base de datos.
 */
const createRawMaterial = async (name: string): Promise<RawMaterial> => {
  try {
    if (name.trim() === "") {
      throw new Error("El nombre no debe estar vacío");
    }

    const rawMaterial = await RawMaterial.findOne({
      where: { name },
    });

    if (rawMaterial) {
      throw new Error("Ya existe una materia prima con ese nombre");
    }

    return await RawMaterial.create({
      name,
    });
  } catch (error) {
    console.error("Error al crear la materia prima: ", error);
    throw error;
  }
};

export default {
  getAllRawMaterials,
  createRawMaterial,
};
