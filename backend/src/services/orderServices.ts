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
import finishedProduct from "./finishedProductServices";
import Weighing from "../models/Weighing";
import User from "../models/User";
import { CustomError } from "../utils/CustomError";

const getAllOrders = async (): Promise<Order[]> => {
  try {
    const orders = await Order.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: Client,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
        {
          model: Color,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
        {
          model: Denier,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
        {
          model: Tone,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
        {
          model: RawMaterial,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
        {
          model: Product,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
      order: [["id", "DESC"]],
    });
    return orders;
  } catch (error) {
    throw new CustomError(
      500,
      `Error al obtener las ordenes: ${error.message}`
    );
  }
};

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
    throw new CustomError(
      500,
      `Error al obtener las ordenes actuales: ${error.message}`
    );
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
      throw new CustomError(404, "Orden no encontrada");
    }
    return resp;
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError(
      500,
      `Error al obtener la orden por ID ${error.message}`
    );
  }
};

const getOrderById = async (id: number): Promise<Order> => {
  try {
    const resp = await Order.findOne({
      where: { id },
      include: [
        {
          model: Color,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
        {
          model: Denier,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
        {
          model: Tone,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
        {
          model: RawMaterial,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
        {
          model: Product,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
        {
          model: Client,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
        {
          model: Weighing,
          attributes: { exclude: ["createdAt", "updatedAt"] },
          include: [
            {
              model: User,
              attributes: {
                exclude: [
                  "password",
                  "dni",
                  "code",
                  "isActive",
                  "createdAt",
                  "updatedAt",
                ],
              },
            },
          ],
        },
      ],
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    if (!resp) {
      throw new CustomError(404, "Orden no encontrada");
    }
    return resp;
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError(
      500,
      `Error al obtener la orden por ID ${error.message}`
    );
  }
};

const getOrderId = async (ppe: number, batch: number): Promise<number> => {
  try {
    const order = await Order.findOne({
      where: { ppe, batchNumber: batch },
      attributes: ["id"],
    });
    if (!order) {
      throw new CustomError(404, "Orden no encontrada");
    }
    return order.id;
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError(
      500,
      `Error al obtener el ID de la orden ${error.message}`
    );
  }
};

const updateKilosProcesed = async (
  orderId: number,
  kilos: number
): Promise<void> => {
  try {
    const order = await Order.findByPk(orderId);
    if (!order) {
      throw new CustomError(404, "Orden no encontrada");
    }
    console.log(order.processedKilos);

    if (order.processedKilos === 0) {
      await updateStateOrder(order.id, "en progreso");
    }
    order.processedKilos += kilos;
    if (order.processedKilos >= order.kilos) {
      await updateStateOrder(order.id, "completada");
    }
    await order.save();
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError(
      500,
      `Error al actualizar la suma de la orden ${error.message}`
    );
  }
};

const createOrder = async (data: OrderData): Promise<Order> => {
  try {
    const newOrder = await Order.create({
      ppe: data.ppe,
      orderNumber: data.orderNumber,
      date: data.date,
      kilos: data.kilos,
      passedKilos: data.passedKilos || 0,
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
    const lastPPE = await ppeServices.getLastPPE();
    if (lastPPE.ppe + 1 === data.ppe) {
      await ppeServices.updatePPE();
    }
    return newOrder;
  } catch (error: any) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError(500, `Error al crear la orden ${error.message}`);
  }
};

const updateOrder = async (id: number, data: OrderData): Promise<Order> => {
  try {
    const order = await verifyExistingOrder(id);
    if (!order) {
      throw new CustomError(404, "Orden no encontrada");
    }
    const weighing = await weightServices.getWeighingByOrderId(id);
    if (weighing) {
      throw new CustomError(
        409,
        `No fue posible actualizar la orden, ya se ha realizado un pesaje PPE:${order.ppe} Partida: ${order.batchNumber}.`
      );
    }
    order.orderNumber = data.orderNumber;
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
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError(500, `Error al actualizar la orden ${error.message}`);
  }
};

const deleteOrder = async (id: number): Promise<void> => {
  try {
    const order = await verifyExistingOrder(id);
    if (!order) {
      throw new CustomError(404, "Orden no encontrada");
    }
    const weighing = await weightServices.getWeighingByOrderId(id);
    if (weighing) {
      throw new CustomError(
        409,
        `No fue posible cancelar la orden, ya se ha realizado un pesaje PPE:${order.ppe} Partida: ${order.batchNumber}.`
      );
    }
    await updateStateOrder(order.id, "cancelada");
    order.isCanceled = true;
    order.endDate = new Date();
    await order.save();
  } catch (error: any) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError(500, `Error al cancelar la orden ${error.message}`);
  }
};

const verifyExistingOrder = async (id: number): Promise<Order> => {
  try {
    const order = await Order.findByPk(id);
    return order;
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError(500, `Error al verificar la orden ${error.message}`);
  }
};

const getTotalActiveOrders = async (): Promise<number> => {
  try {
    const activeOrdersCount = await Order.count({
      where: {
        isCanceled: false,
        endDate: null,
      },
    });
    return activeOrdersCount;
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError(
      500,
      `Error al obtener el total de ordenes activas ${error.message}`
    );
  }
};

const updateStateOrder = async (
  idOrder: number,
  state: string
): Promise<void> => {
  try {
    if (
      state === "pendiente" ||
      state === "en progreso" ||
      state === "completada" ||
      state === "cancelada"
    ) {
      const order = await verifyExistingOrder(idOrder);
      if (!order) {
        throw new CustomError(404, "Orden no encontrada");
      }
      order.status = state;
      await order.save();
    } else {
      throw new CustomError(400, "Estado de orden no valido");
    }
  } catch (error: any) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError(
      500,
      `Error al actualizar el estado de la orden ${error.message}`
    );
  }
};

export default {
  getAllOrders,
  getOrderForWeighing,
  getOrderId,
  getOrderById,
  getCurrentOrders,
  updateKilosProcesed,
  createOrder,
  updateOrder,
  deleteOrder,
  getTotalActiveOrders,
  updateStateOrder,
};
