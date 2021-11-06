import { Router } from "express";
import { UsersController } from "../controllers/UsersController";

const usersController = new UsersController()

const routes = Router()

routes.get('/user', usersController.index)
routes.get('/user/:id', usersController.find)
routes.post('/user', usersController.create)


export default routes