import ActivationCodes from "../models/Activation";

const createActivationCode = async (
  code: string,
  type: "balance" | "normal"
): Promise<ActivationCodes> => {
  try {
    const newCode = await ActivationCodes.create({ code, type });
    return newCode;
  } catch (error) {
    console.error("Error creando codigo de activación: ", error);
    throw error;
  }
};

const verifyActivationCode = async (
  code: string
): Promise<ActivationCodes | null> => {
  try {
    const foundCode = await ActivationCodes.findOne({ where: { code } });
    return foundCode;
  } catch (error) {
    console.error("Error verificando codigo de activación: ", error);
    throw error;
  }
};

export default {
  createActivationCode,
  verifyActivationCode,
};
