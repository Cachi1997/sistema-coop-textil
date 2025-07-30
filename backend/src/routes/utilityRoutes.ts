import { Router } from "express";
import { getClients } from "../controllers/clientController";
import { getColors } from "../controllers/colorController";
import { getDeniers } from "../controllers/denierController";
import { getProducts } from "../controllers/productController";
import { getRawMaterials } from "../controllers/rawMaterialController";
import { getTones } from "../controllers/toneController";

const utilityRouter = Router();

utilityRouter.get("/clients", getClients);
utilityRouter.get("/colors", getColors);
utilityRouter.get("/deniers", getDeniers);
utilityRouter.get("/products", getProducts);
utilityRouter.get("/rawMaterials", getRawMaterials);
utilityRouter.get("/tones", getTones);

export default utilityRouter;
