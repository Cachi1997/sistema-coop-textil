import { Router } from "express";
import { createClient, getClients } from "../controllers/clientController";
import { createColor, getColors } from "../controllers/colorController";
import { createDenier, getDeniers } from "../controllers/denierController";
import { createProduct, getProducts } from "../controllers/productController";
import {
  createRawMaterial,
  getRawMaterials,
} from "../controllers/rawMaterialController";
import { createTone, getTones } from "../controllers/toneController";
import { getLastPPE, resetPPE } from "../controllers/ppeController";
import { getDashboardData } from "../controllers/dashboardController";
import {
  createSection,
  getAllSections,
} from "../controllers/sectionController";
import {
  createActivationCode,
  verifyActivationCode,
} from "../controllers/activationCodeController";

const utilityRouter = Router();

utilityRouter.post("/activation", createActivationCode);
utilityRouter.post("/activation/validate", verifyActivationCode);

utilityRouter.get("/dashboard/summary", getDashboardData);

utilityRouter.get("/clients", getClients);
utilityRouter.post("/clients", createClient);

utilityRouter.get("/colors", getColors);
utilityRouter.post("/colors", createColor);

utilityRouter.get("/deniers", getDeniers);
utilityRouter.post("/deniers", createDenier);

utilityRouter.get("/products", getProducts);
utilityRouter.post("/products", createProduct);

utilityRouter.get("/rawMaterials", getRawMaterials);
utilityRouter.post("/rawMaterials", createRawMaterial);

utilityRouter.get("/tones", getTones);
utilityRouter.post("/tones", createTone);

utilityRouter.get("/lastPPE", getLastPPE);
utilityRouter.post("/resetPPE", resetPPE);

utilityRouter.get("/sections", getAllSections);
utilityRouter.post("/sections", createSection);

export default utilityRouter;
