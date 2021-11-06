import { Router } from "express";
import { CartsController } from "../controllers/CartsController";

const cartsController = new CartsController()

const routes = Router()

routes.post('/cart', cartsController.create)
routes.get('/cart/user/:id', cartsController.findUser)


export default routes