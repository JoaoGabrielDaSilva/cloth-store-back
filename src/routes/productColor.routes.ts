import { Router } from "express";
import { ProductColorsController } from "../controllers/ProductColorsController";

const productColorsController = new ProductColorsController();

const routes = Router();

routes.post("/product-color", productColorsController.create);

export default routes;
