import { Router } from "express";
import {
  createWeight,
  exportWeighingsPdf,
  searchWeighings,
} from "../controllers/weightController";


const weighingRouter = Router();

weighingRouter.post("/saveWeight", createWeight);
weighingRouter.get("/reports", searchWeighings);
weighingRouter.get("/export/pdf", exportWeighingsPdf);

export default weighingRouter;
