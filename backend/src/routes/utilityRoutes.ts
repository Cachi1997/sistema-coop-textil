import { Router } from "express";
import { getClients } from "../controllers/clientController";
import { getColors } from "../controllers/colorController";
import { getDeniers } from "../controllers/denierController";
import { getProducts } from "../controllers/productController";
import { getRawMaterials } from "../controllers/rawMaterialController";
import { getTones } from "../controllers/toneController";
import { getLastPPE } from "../controllers/ppeController";

const utilityRouter = Router();

utilityRouter.get("/clients", getClients);
utilityRouter.get("/colors", getColors);
utilityRouter.get("/deniers", getDeniers);
utilityRouter.get("/products", getProducts);
utilityRouter.get("/rawMaterials", getRawMaterials);
utilityRouter.get("/tones", getTones);
utilityRouter.get("/lastPPE", getLastPPE);

export default utilityRouter;
