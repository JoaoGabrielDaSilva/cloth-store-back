import { Request, Response } from "express";
import { ProductsService } from "../services/ProductsService";

class ProductsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, price, colorName, color, colors } = request.body;
    const productsService = new ProductsService();

    try {
      const product = await productsService.createProduct(
        name,
        price,
        colorName,
        color,
        colors
      );

      return response.json(product);
    } catch (error) {
      console.log(error);
      return response.status(422).json({
        message: error.message,
      });
    }
  }
}

export { ProductsController };
