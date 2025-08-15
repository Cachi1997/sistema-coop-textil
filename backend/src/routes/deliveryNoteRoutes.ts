import { Router } from "express";
import { generateDeliveryNote } from "../controllers/deliveryNoteController";

const deliveryNoteRouter = Router();

deliveryNoteRouter.post("/delivery-note", generateDeliveryNote);

export default deliveryNoteRouter;
