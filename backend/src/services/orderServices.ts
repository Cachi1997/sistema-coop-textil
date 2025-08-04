import { or, Op } from "sequelize";
import Client from "../models/Client";
import Color from "../models/Color";
import { Denier } from "../models/Denier";
import Order from "../models/Order";
import Product from "../models/Product";
import RawMaterial from "../models/RawMaterial";
import Tone from "../models/Tone";
import { FinishedProductData, OrderData } from "../types";
import ppeServices from "./ppeServices";
import weightServices from "./weightServices";
import FinishedProduct from "../models/FinishedProduct";
import finishedProduct from "./finishedProduct";

const getCurrentOrders = async (): Promise<Order[]> => {
  try {
    // Get all finished order IDs
    const finishedOrders = await finishedProduct.getFinishedProducts();
    const finishedOrderIds = finishedOrders.map(
      (fp: FinishedProductData) => fp.orderId
    );

    // Find orders that are not canceled and not finished
    const orders = await Order.findAll({
      where: {
        isCanceled: false,
        id: {
          [Op.notIn]: finishedOrderIds.length ? finishedOrderIds : [0],
        },
      },
      include: [
        { model: Client },
        { model: Color },
        { model: Denier },
        { model: Tone },
        { model: RawMaterial },
        { model: Product },
      ],
      order: [["id", "DESC"]],
    });
    return orders;
  } catch (error) {
    console.error("Error fetching current orders:", error);
    throw new Error("No fue posible obtener las órdenes actuales.");
  }
};

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

const getOrderById = async (id: number): Promise<Order> => {
  try {
    const resp = await Order.findOne({
      where: { id },
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
      attributes: { exclude: ["createdAt", "updatedAt"] },
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

const createOrder = async (data: OrderData): Promise<Order> => {
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
    console.error("Error creando la orden:", error);
    throw new Error(`Ocurrió un error al crear la orden: ${error.message}`);
  }
};

const updateOrder = async (id: number, data: OrderData): Promise<Order> => {
  try {
    const order = await verifyExistingOrder(id);
    if (!order) {
      throw new Error("Orden no encontrada");
    }
    const weighing = await weightServices.getWeighingByOrderId(id);
    if (weighing) {
      throw new Error(
        `No fue posible actualizar la orden, ya se ha realizado un pesaje PPE:${order.ppe} Partida: ${order.batchNumber}.`
      );
    }
    order.orderNumber = data.orderNumber;
    order.date = order.dataValues.date;
    order.kilos = data.kilos;
    order.passedKilos = data.passedKilos;
    order.batchNumber = data.originalBatch;
    order.endDate = null;
    order.lastKG = 0;
    order.observation = data.notes || "";
    order.firstTruck = data.truck1 || "";
    order.secondTruck = data.truck2 || "";
    order.productId = data.productId;
    order.clientId = data.clientId;
    order.colorId = data.colorId;
    order.denierId = data.denierId;
    order.toneId = data.toneId;
    order.rawMaterialId = data.rawMaterialId;

    await order.save();
    return order;
  } catch (error: any) {
    console.error("Error al actualizar la orden:", error);
    throw new Error(`Error al actualizar la orden: ${error.message}`);
  }
};

const deleteOrder = async (id: number): Promise<void> => {
  try {
    const order = await verifyExistingOrder(id);
    if (!order) {
      throw new Error("Orden no encontrada");
    }
    const weighing = await weightServices.getWeighingByOrderId(id);
    if (weighing) {
      throw new Error(
        `No fue posible eliminar la orden, ya se ha realizado un pesaje PPE:${order.ppe} Partida: ${order.batchNumber}.`
      );
    }
    order.isCanceled = true;
    order.endDate = new Date();
    await order.save();
  } catch (error: any) {
    console.error("Error al cancelar la orden:", error);
    throw new Error(`Error al cancelar la orden: ${error.message}`);
  }
};

const verifyExistingOrder = async (id: number): Promise<Order> => {
  try {
    const order = await Order.findByPk(id);
    return order;
  } catch (error) {
    console.error("Error al verificar la orden existente:", error);
    throw new Error("No fue posible verificar la orden existente.");
  }
};

export default {
  getOrderForWeighing,
  getOrderId,
  getOrderById,
  getCurrentOrders,
  updateKilosProcesed,
  createOrder,
  updateOrder,
  deleteOrder,
};
