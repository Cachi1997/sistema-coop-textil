import Client from "../models/Client";
import Color from "../models/Color";
import { Denier } from "../models/Denier";
import Order from "../models/Order";
import Product from "../models/Product";
import RawMaterial from "../models/RawMaterial";
import Tone from "../models/Tone";

const getOrderForWeighing = async (
  ppe: number,
  batchNumber: number,
  isYarn: number
): Promise<Order> => {
  try {
    const resp = await Order.findOne({
      where: { ppe, batchNumber },
      attributes: ["id", "ppe", "orderNumber", "batchNumber"],
      include: [
        {
          model: Color,
        },
        {
          model: Denier,
        },
        {
          model: Tone,
        },
        {
          model: RawMaterial,
        },
        {
          model: Product,
        },
        {
          model: Client,
        },
      ],
    });
    if (!resp) {
      throw new Error("Orden no encontrada");
    }
    return resp;
  } catch (error) {
    throw new Error(`Error al buscar la orden: ${error.message}`);
  }
};

const getOrderId = async (ppe: number, batch: number): Promise<number> => {
  try {
    const order = await Order.findOne({
      where: { ppe, batchNumber: batch },
      attributes: ["id"],
    });
    if (!order) {
      throw new Error("Orden no encontrada");
    }
    return order.id;
  } catch (error) {
    console.error("Error al buscar el Id:", error);
    throw new Error("No fue posible devolver el id.");
  }
};

export default {
  getOrderForWeighing,
  getOrderId,
};
