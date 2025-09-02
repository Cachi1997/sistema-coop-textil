import { Request, Response } from "express";
import productServices from "../services/productServices";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await productServices.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    const status = error.statusCode || 500;
    res.status(status).json({ message: error.message });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const newProduct = await productServices.createProduct(name.toLowerCase());
    res.status(201).json(newProduct);
  } catch (error) {
    const status = error.statusCode || 500;
    res.status(status).json({ message: error.message });
  }
};
