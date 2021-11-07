import { getCustomRepository } from "typeorm";
import { CartsRepository } from "../repositories/CartsRepository";
import { ProductsRepository } from "../repositories/ProductsRepository";

class CartsService {
  async createCart(user_id: string) {
    if (!user_id) {
      throw new Error("Dados preenchidos de forma incorreta!");
    }

    const cartsRepository = getCustomRepository(CartsRepository);

    const cart = cartsRepository.create({ user_id });

    if (cart) {
      await cartsRepository.save(cart);
      return cart;
    }

    throw new Error("Não foi possível criar o carrinho");
  }

  async getUserByCart(cart_id: string) {
    if (!cart_id) {
      throw new Error("Dados preenchidos de forma incorreta!");
    }

    const cartsRepository = getCustomRepository(CartsRepository);

    const cart = cartsRepository.findOne({
      where: { id: cart_id },
      relations: ["user", "products"],
    });

    if (cart) {
      return cart;
    }

    throw new Error("Não foi possível encontrar o usuário");
  }

  async addProductToCart(productId: string, cartId: string) {
    if (!productId || !cartId) {
      throw new Error("Dados preenchidos de forma incorreta!");
    }

    const cartsRepository = getCustomRepository(CartsRepository);
    const productsRepository = getCustomRepository(ProductsRepository);

    const cart = await cartsRepository.findOne(
      { id: cartId },
      { relations: ["products"] }
    );
    const product = await productsRepository.findOne({ id: productId });

    console.log(cart);

    cart.products.push(product);

    cartsRepository.save(cart);
  }
}

export { CartsService };
