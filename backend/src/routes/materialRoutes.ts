import { Router } from "express";
import { createMaterialReceipt } from "../controllers/mReceiptsController";

const materialRouter = Router();

materialRouter.post("/material", createMaterialReceipt);

export default materialRouter;
