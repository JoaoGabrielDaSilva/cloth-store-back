import { Request, Response } from "express";
import { ProductsService } from "../services/ProductsService";

class ProductsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, price, colorName, color, colors, image } = request.body;
    const productsService = new ProductsService();

    try {
      const product = await productsService.createProduct(
        name,
        price,
        colorName,
        color,
        colors,
        image
      );

      return response.json(product);
    } catch (error) {
      console.log(error);
      return response.status(422).json({
        message: error.message,
      });
    }
  }
  async findById(request: Request, response: Response): Promise<Response> {

    const { id } = request.params;
    const productsService = new ProductsService();

    try {
      const product = await productsService.findById(id
      )

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
