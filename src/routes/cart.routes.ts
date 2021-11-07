import { Router } from "express";
import { CartsController } from "../controllers/CartsController";

const cartsController = new CartsController();

const routes = Router();

routes.post("/cart", cartsController.create);
routes.post("/cart/product", cartsController.addProductToCart);
routes.get("/cart/user/:id", cartsController.findUser);

export default routes;
