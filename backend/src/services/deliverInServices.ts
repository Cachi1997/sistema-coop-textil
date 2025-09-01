import DeliverIn from "../models/DeliverIn";
import { CustomError } from "../utils/CustomError";

const createDeliverIn = async (direction: string): Promise<DeliverIn> => {
  try {
    if (direction.trim() === "") {
      throw new CustomError(400, "La dirección no puede estar vacía");
    }

    const existingDeliverIn = await DeliverIn.findOne({
      where: { direction },
    });

    if (existingDeliverIn) {
      throw new CustomError(409, "La dirección ya existe");
    }

    return await DeliverIn.create({
      direction,
    });
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError(
      500,
      `Error al obtener la direccion: ${error.message}`
    );
  }
};

export default {
  createDeliverIn,
};
