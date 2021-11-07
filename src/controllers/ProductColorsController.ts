import { Request, Response } from "express";
import { ProductColorsService } from "../services/ProductColor";

class ProductColorsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, color } = request.body;

    const productColorsService = new ProductColorsService();

    try {
      const productColor = await productColorsService.createProductColor(
        name,
        color
      );

      return response.json(productColor);
    } catch (error) {
      console.log(error);
      return response.status(422).json({
        message: error.message,
      });
    }
  }
}

export { ProductColorsController };
