import { Router } from "express";
import { ProductsController } from "../controllers/ProductsController";

const productsController = new ProductsController();

const routes = Router();

routes.post("/product", productsController.create);

export default routes;
