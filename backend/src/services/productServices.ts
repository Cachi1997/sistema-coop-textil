import Product from "../models/Product";
import { CustomError } from "../utils/CustomError";

/**
 * Devuelve un arreglo de productos
 *
 * @returns Arreglo de productos
 * @throws Error al encontrar productos
 */
const getAllProducts = async (): Promise<Product[]> => {
  try {
    const products = await Product.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    return products;
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError(
      500,
      `Error al obtener los productos: ${error.message}`
    );
  }
};

/**
 * Crea un nuevo producto
 *
 * @param name - Nombre del producto
 * @returns El objeto Producto creado
 * @throws Error si ya existe un producto con ese nombre
 */
const createProduct = async (name: string): Promise<Product> => {
  try {
    if (name.trim() === "") {
      throw new Error("El nombre no debe estar vacío");
    }
    const existingProduct = await Product.findAll({ where: { name } });
    if (existingProduct.length > 0) {
      throw new CustomError(409, `El producto ${name} ya existe`);
    }
    return await Product.create({
      name,
    });
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError(500, `Error al crear el producto: ${error.message}`);
  }
};

export default {
  getAllProducts,
  createProduct,
};
