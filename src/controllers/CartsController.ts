import { Request, Response } from "express";
import { CartsService } from "../services/CartsService";

class CartsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { userId } = request.body;

    const cartsService = new CartsService();

    try {
      const cart = await cartsService.createCart(userId);

      return response.json(cart);
    } catch (error) {
      console.log(error);
      return response.status(422).json({
        message: error.message,
      });
    }
  }

  async findUser(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const cartsService = new CartsService();

    try {
      const user = await cartsService.getUserByCart(id);

      return response.json(user);
    } catch (error) {
      console.log(error);
      return response.status(422).json({
        message: error.message,
      });
    }
  }

  async addProductToCart(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { productId, cartId } = request.body;

    const cartsService = new CartsService();

    try {
      const cart = await cartsService.addProductToCart(productId, cartId);

      return response.json(cart);
    } catch (error) {
      console.log(error);
      return response.status(422).json({
        message: error.message,
      });
    }
  }
}

export { CartsController };
