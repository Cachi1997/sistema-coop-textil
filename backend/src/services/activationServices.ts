import ActivationCodes from "../models/Activation";
import { CustomError } from "../utils/CustomError";

const createActivationCode = async (
  code: string,
  type: "balance" | "normal"
): Promise<ActivationCodes> => {
  try {
    if (type !== "balance" && type !== "normal") {
      throw new CustomError(400, "Tipo de código inválido");
    }
    const exixtingCode = await ActivationCodes.findOne({ where: { code } });
    if (exixtingCode) {
      throw new CustomError(409, `El código ${code} ya existe`);
    }
    const newCode = await ActivationCodes.create({ code, type });
    return newCode;
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError(
      500,
      `Error al crear el codigo de activación: ${error.message}`
    );
  }
};

const verifyActivationCode = async (
  code: string
): Promise<ActivationCodes | null> => {
  try {
    const foundCode = await ActivationCodes.findOne({ where: { code } });
    return foundCode;
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError(
      500,
      `Error al verificar el codigo de activación: ${error.message}`
    );
  }
};

export default {
  createActivationCode,
  verifyActivationCode,
};
