import Product from "../models/Product";

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
    throw new Error(`Error al obtener productos: ${error.message}`);
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
    if (existingProduct) {
      throw new Error(`Ya existe un producto con el nombre ${name}`);
    }
    return await Product.create({
      name,
    });
  } catch (error) {
    console.error("Ocurrio un error al crear el producto", error);
    throw error;
  }
};

export default {
  getAllProducts,
  createProduct,
};
