import { Request, Response } from "express";
import userServices from "../services/userServices";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userServices.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUser = async (req: Request, res: Response) => {
  const { code } = req.params;

  try {
    const user = await userServices.getFullUserByCode(Number(code));
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
