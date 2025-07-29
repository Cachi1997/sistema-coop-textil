import { Router } from "express";

import { getUsers, getUser } from "../controllers/userControllers";

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/:code", getUser);

export default userRouter;
