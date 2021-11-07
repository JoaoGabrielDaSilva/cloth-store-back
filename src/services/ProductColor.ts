import { getCustomRepository } from "typeorm";
import { ProductColorsRepository } from "../repositories/ProductColors";

class ProductColorsService {
  async createProductColor(name: string, color: string) {
    if (!name || !color) {
      throw new Error("Dados preenchidos de forma incorreta!");
    }

    const productColorsRepository = getCustomRepository(
      ProductColorsRepository
    );

    const cart = productColorsRepository.create({ name, color });

    if (cart) {
      await productColorsRepository.save(cart);
      return cart;
    }

    throw new Error("Não foi possível criar a cor");
  }
}

export { ProductColorsService };
