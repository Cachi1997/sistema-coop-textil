import RawMaterial from "../models/RawMaterial";
import { CustomError } from "../utils/CustomError";

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
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError(
      500,
      `Error al obtener las materias prima/origenes: ${error.message}`
    );
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
      throw new CustomError(400, "El nombre no debe estar vacío");
    }

    const rawMaterial = await RawMaterial.findOne({
      where: { name },
    });

    if (rawMaterial) {
      throw new CustomError(409, `La materia prima ${name} ya existe`);
    }

    return await RawMaterial.create({
      name,
    });
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError(
      500,
      `Error al crear la materia prima/origen: ${error.message}`
    );
  }
};

export default {
  getAllRawMaterials,
  createRawMaterial,
};
