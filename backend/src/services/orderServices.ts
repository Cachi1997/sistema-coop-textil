import { or } from "sequelize";
import Client from "../models/Client";
import Color from "../models/Color";
import { Denier } from "../models/Denier";
import Order from "../models/Order";
import Product from "../models/Product";
import RawMaterial from "../models/RawMaterial";
import Tone from "../models/Tone";
import { OrderData } from "../types";
import ppeServices from "./ppeServices";

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

const updateKilosProcesed = async (
  orderId: number,
  kilos: number
): Promise<void> => {
  try {
    const order = await Order.findByPk(orderId);
    if (!order) {
      throw new Error("Orden no encontrada");
    }
    order.processedKilos += kilos;
    await order.save();
  } catch (error) {
    console.error("Error al actualizar kilos procesados:", error);
    throw new Error("No fue posible actualizar los kilos procesados.");
  }
};

const createOrder = async (data: OrderData) => {
  try {
    const newOrder = await Order.create({
      ppe: data.ppe,
      orderNumber: data.orderNumber,
      date: data.date,
      kilos: data.kilos,
      passedKilos: data.passedKilos,
      batchNumber: data.originalBatch,
      cicle: 0,
      endDate: null,
      lastKG: 0,
      observation: data.notes || "",
      isCanceled: false,
      isPrinted: false,
      firstTruck: data.truck1 || "",
      secondTruck: data.truck2 || "",
      processedKilos: 0,
      productId: data.productId,
      clientId: data.clientId,
      colorId: data.colorId,
      denierId: data.denierId,
      toneId: data.toneId,
      rawMaterialId: data.rawMaterialId,
    });
    await ppeServices.updatePPE();
    return newOrder;
  } catch (error: any) {
    console.error("Error creating order:", error);
    throw new Error(`Error creating order: ${error.message}`);
  }
};

export default {
  getOrderForWeighing,
  getOrderId,
  updateKilosProcesed,
  createOrder,
};
