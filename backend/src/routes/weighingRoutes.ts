import { Router } from "express";
const { createWeight } = require("../controllers/weightController");

const weighingRouter = Router();

weighingRouter.post("/saveWeight", createWeight);

export default weighingRouter;
