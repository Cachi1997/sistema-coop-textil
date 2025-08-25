import DeliverIn from "../models/DeliverIn";

const createDeliverIn = async (direction: string): Promise<DeliverIn> => {
  try {
    if (direction.trim() === "") {
      throw new Error("La dirección no debe estar vacía");
    }

    const existingDeliverIn = await DeliverIn.findOne({
      where: { direction },
    });

    if (existingDeliverIn) {
      throw new Error("Ya existe una dirección de entrega con ese nombre");
    }

    return await DeliverIn.create({
      direction,
    });
  } catch (error) {
    console.error("Error al crear la dirección de entrega: ", error);
    throw error;
  }
};

export default {
  createDeliverIn,
};
