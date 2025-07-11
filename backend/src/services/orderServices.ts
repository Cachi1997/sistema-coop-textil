import Order from "../models/Order";

const getOrderForWeighing = async (
  ppe: number,
  batchNumber: number,
  isYarn: number
) => {
  try {
    const resp = await Order.findOne({ where: { ppe, batchNumber } });
  } catch (error) {
    throw new Error(`Error fetching the order: ${error.message}`);
  }
};

export default {
  getOrderForWeighing,
};
