import Transport from "../models/Transport";

const createTransport = async (
  transport: string,
  direction: string
): Promise<Transport> => {
  try {
    if (transport.trim() === "") {
      throw new Error("El transporte no debe estar vacío");
    }

    const existingTransport = await Transport.findOne({
      where: { name: transport },
    });

    if (existingTransport) {
      throw new Error("Ya existe un transporte con ese nombre");
    }

    return await Transport.create({
      name: transport,
      direction,
    });
  } catch (error) {
    console.error("Error al crear el transporte: ", error);
    throw error;
  }
};

export default {
  createTransport,
};
