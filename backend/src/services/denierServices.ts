import { Denier } from "../models/Denier";

/**
 * Devuelve un arreglo de Deniers
 *
 * @returns Arreglo de Deniers
 */
const getAllDeniers = async (): Promise<Denier[]> => {
  try {
    const deniers = await Denier.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    return deniers;
  } catch (error) {
    throw new Error(`Error obteniendo los deniers: ${error.message}`);
  }
};

/**
 * Crea un nuevo Denier en la base de datos
 *
 * @param denier - denier del objeto
 * @param key - clave del objeto (opcional)
 * @param coefficient - coeficiente del objeto (opcional)
 * @returns El objeto Denier creado
 * @throws Error si ya existe un objeto con el mismo denier
 */
const createDenier = async (
  denier: number,
  key?: number,
  coefficient?: number
): Promise<Denier> => {
  try {
    const existeingDenier = await Denier.findOne({
      where: { denier },
    });

    if (existeingDenier) {
      throw new Error(`Ya existe un Denier del tipo ${denier}`);
    }

    return await Denier.create({
      denier,
      key: key || null,
      coefficient: coefficient || null,
    });
  } catch (error) {
    console.error("Error al crear el denier", error);
    throw error;
  }
};

export default {
  getAllDeniers,
  createDenier,
};
