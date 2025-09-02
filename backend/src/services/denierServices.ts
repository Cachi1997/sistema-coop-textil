import { Denier } from "../models/Denier";
import { CustomError } from "../utils/CustomError";

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
    throw new CustomError(
      500,
      `Error al obtener los usuarios: ${error.message}`
    );
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
      throw new CustomError(
        409,
        `El denier con valor ${denier} ya existe en la base de datos`
      );
    }

    return await Denier.create({
      denier,
      key: key || null,
      coefficient: coefficient || null,
    });
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError(500, `Error al crear el denier: ${error.message}`);
  }
};

export default {
  getAllDeniers,
  createDenier,
};
