import { Request, Response } from "express";
import productServices from "../services/productServices";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await productServices.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error fetching products: ${error.message}` });
  }
};
