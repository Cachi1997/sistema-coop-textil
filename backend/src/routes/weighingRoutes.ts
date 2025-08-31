import { Router } from "express";
import {
  exportWeighingsPdf,
  searchWeighings,
} from "../controllers/weightController";
const { createWeight } = require("../controllers/weightController");

const weighingRouter = Router();

weighingRouter.post("/saveWeight", createWeight);
weighingRouter.get("/reports", searchWeighings);
weighingRouter.get("/export/pdf", exportWeighingsPdf);

export default weighingRouter;
