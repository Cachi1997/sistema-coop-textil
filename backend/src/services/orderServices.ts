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
) => {
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
    return resp;
  } catch (error) {
    throw new Error(`Error fetching the order: ${error.message}`);
  }
};

export default {
  getOrderForWeighing,
};
