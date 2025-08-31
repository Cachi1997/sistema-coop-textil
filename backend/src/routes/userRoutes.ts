import { Router } from "express";

import {
  getUsers,
  getUser,
  createUser,
  deleteUser,
} from "../controllers/userControllers";

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/:code", getUser);
userRouter.post("/create-user", createUser);
userRouter.delete("/delete-user/:id", deleteUser);

export default userRouter;
