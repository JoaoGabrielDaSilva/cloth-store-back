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
    colors: Array<any>
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
      color: color
    });




    const colorsArray = colors.map((product) => {
      const a = productColorsRepository.create({
        name: product.colorName,
        color: product.color
      })
      productColorsRepository.save(a)

      return productsRepository.create({
        name: product.name,
        price: product.price,
        color: a,
      })
    });




    const product = productsRepository.create({
      name,
      price,
      color: productColor,
      colors: colorsArray
    });

    


    if (product) {
      console.log(await productsRepository.save(product))
      await productsRepository.save(colorsArray)
      await productColorsRepository.save(productColor)

      return product;
    }

    throw new Error("Não foi possível criar o produto");
  }

  async findById(id: string) {

    const productsRepository = getCustomRepository(ProductsRepository);


    const product = await productsRepository.findOne(id, {relations: ['colors', 'color', 'colors.color']})

    console.log(product);
    

    if (product) {
      return product
    }
  }
}

export { ProductsService };
