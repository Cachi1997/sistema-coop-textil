import { Request, Response } from "express";
import userServices from "../services/userServices";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userServices.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    const status = error.statusCode || 500;
    res.status(status).json({ message: error.message });
  }
};

export const getUser = async (req: Request, res: Response) => {
  const { code } = req.params;

  try {
    const user = await userServices.getFullUserByCode(Number(code));
    res.status(200).json(user);
  } catch (error: any) {
    const status = error.statusCode || 500;
    res.status(status).json({ message: error.message });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { firstName, lastName, dni, code } = req.body;
  try {
    const newUser = await userServices.createUser(
      firstName,
      lastName,
      Number(dni),
      Number(code)
    );
    res.status(201).json(newUser);
  } catch (error) {
    const status = error.statusCode || 500;
    res.status(status).json({ message: error.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await userServices.deleteUser(Number(id));
    res.status(200).json({ message: "Usuario eliminado con exito" });
  } catch (error) {
    const status = error.statusCode || 500;
    res.status(status).json({ message: error.message });
  }
};
