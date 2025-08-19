import { Request, Response } from "express";
import productServices from "../services/productServices";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await productServices.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const newProduct = await productServices.createProduct(name.toLowerCase());
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
