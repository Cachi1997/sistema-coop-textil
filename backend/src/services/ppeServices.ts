import PPE from "../models/PPE";
import { CustomError } from "../utils/CustomError";

const getLastPPE = async () => {
  try {
    const currentYear = new Date().getFullYear();

    const lastPPE = await PPE.findOne({
      where: { period: currentYear },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    return lastPPE;
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError(
      500,
      `Error al obtener el ultimo PPE: ${error.message}`
    );
  }
};

const updatePPE = async (): Promise<void> => {
  try {
    const currentYear = new Date().getFullYear();
    const currentPPE = await PPE.findOne({
      where: { period: currentYear },
    });

    if (!currentPPE) {
      throw new CustomError(404, "No se encontro el PPE actual");
    }

    currentPPE.ppe += 1;
    await currentPPE.save();
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError(500, `Error al actualizar el PPE: ${error.message}`);
  }
};

const resetPPE = async (): Promise<void> => {
  try {
    const currentYear = new Date().getFullYear();
    const currentPPE = await PPE.findOne({
      where: { period: currentYear },
    });
    if (currentPPE) {
      throw new CustomError(400, "El PPE del año actual ya existe");
    }
    await PPE.create({ period: currentYear, ppe: 0 });
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError(500, `Error al resetear el PPE: ${error.message}`);
  }
};

export default {
  getLastPPE,
  updatePPE,
  resetPPE,
};
