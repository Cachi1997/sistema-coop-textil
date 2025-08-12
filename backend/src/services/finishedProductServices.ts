import Batch from "../models/Batch";
import FinishedProduct from "../models/FinishedProduct";

const getFinishedProducts = async (): Promise<FinishedProduct[]> => {
  try {
    const finishedProducts = await FinishedProduct.findAll({
      include: [
        {
          model: Batch,
          attributes: ["id", "batchNumber"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    return finishedProducts;
  } catch (error) {
    console.error("Error fetching finished products by order ID:", error);
    throw new Error("No fue posible obtener los productos terminados.");
  }
};

const getCountFinishedProducts = async (): Promise<number> => {
  try {
    const count = await FinishedProduct.count({
      where: { is_available: true },
    });
    return count;
  } catch (error) {
    console.error("Error counting finished products:", error);
    throw new Error("No fue posible contar los productos terminados.");
  }
};

export default {
  getFinishedProducts,
  getCountFinishedProducts,
};
