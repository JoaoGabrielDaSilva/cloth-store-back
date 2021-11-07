import { getCustomRepository } from "typeorm";
import { Product } from "../entities/Product";
import { CartsRepository } from "../repositories/CartsRepository";
import { ProductColorsRepository } from "../repositories/ProductColors";
import { ProductsRepository } from "../repositories/ProductsRepository";

interface IProduct {
  name: string;
  price: number;
  colorName: string;
  color: string;
  colors: Product[];
}

class ProductsService {
  async createProduct(
    name: string,
    price: number,
    colorName: string,
    color: string,
    colors: Product[]
  ) {
    if (!name || !price || !colorName || !color) {
      throw new Error("Dados preenchidos de forma incorreta!");
    }

    const productsRepository = getCustomRepository(ProductsRepository);
    const productColorsRepository = getCustomRepository(
      ProductColorsRepository
    );

    const productColor = productColorsRepository.create({
      name: colorName,
      color,
    });

    const colorsArray = colors.map((product) => {
      return {
        name: product.name,
        price: product.price,
        color: productColorsRepository.create({
          name: product.color.name,
          color: product.color.color,
        }),
      };
    });

    const product = productsRepository.create({
      name,
      price,
      color: productColor,
      colors: colorsArray,
    });

    if (product) {
      console.log(product);
      await productsRepository.save(product);
      return product;
    }

    throw new Error("Não foi possível criar o produto");
  }
}

export { ProductsService };
