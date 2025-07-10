import { getUserByCode, getAllUsers } from "../services/userServices";
import { Request, Response } from "express";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await getUserByCode(Number(id));
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
