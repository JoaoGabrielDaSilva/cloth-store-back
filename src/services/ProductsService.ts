import { getCustomRepository } from "typeorm";
import { Product } from "../entities/Product";
import { CartsRepository } from "../repositories/CartsRepository";
import { ProductColorsRepository } from "../repositories/ProductColors";
import { ProductImagesRepository } from "../repositories/ProductImageRepository";
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
    colors: Array<any>,
    image: string
  ) {
    if (!name || !price || !colorName || !color) {
      throw new Error("Dados preenchidos de forma incorreta!");
    }

    const productsRepository = getCustomRepository(ProductsRepository);
    const productImagesRepository = getCustomRepository(ProductImagesRepository);
    const productColorsRepository = getCustomRepository(
      ProductColorsRepository
    );

    const productColor = productColorsRepository.create({
      name: colorName,
      color: color
    });

    const colorsArray = colors.map((product) => {
      const color = productColorsRepository.create({
        name: product.colorName,
        color: product.color
      })
      productColorsRepository.save(color)

      return productsRepository.create({
        name: product.name,
        price: product.price,
        color: color,
        colors: []
      })
    });

    const product = productsRepository.create({
      name,
      price,
      color: productColor,
      colors: colorsArray,
      images: []
    });
    
    colorsArray.forEach(item => {
        colorsArray.forEach(element => {
          if (item.id !== element.id) {
            item.colors.push(element)
          }
        })
        item.colors.push(product)
        productsRepository.save(item)
    })
    
    if (product) {
      await productsRepository.save(product)
      const images = productImagesRepository.create({
        image_uri: image,
        product_id: product.id
      })

      product.images.push(images)
      await productImagesRepository.save(images)
      await productColorsRepository.save(productColor)

      return product;
    }

    throw new Error("Não foi possível criar o produto");
  }

  async findById(id: string) {

    const productsRepository = getCustomRepository(ProductsRepository);
    
    const product = productsRepository
    .createQueryBuilder(                                  "product")
    .where(                                "product.id = :id", {id})
    .innerJoinAndSelect(                 "product.colors", "colors")
    .where(                           "color.id = product.color.id")
    .innerJoinAndSelect(                   "product.color", "color")
    .innerJoinAndSelect(             "colors.color", "colors_color")
    .where(                     "colors.color.id = colors_color.id")
    .innerJoinAndSelect(                 "product_image", "image")
    .where("                         image.product_id = product.id")
    .select([
      'product.id'     , 'product.name'     , 'product.color'      , 
      'color.id'       , 'color.name'       , 'color.color'        ,
      'colors.id'      , 'colors.name'      , 'colors.color'       ,
      'colors_color.id', 'colors_color.name', 'colors_color.color' ,
      'image.id'      , 'image.image_uri'
    ])
    .getOne();


    if (product) {
      return product
    }
  }
}

export { ProductsService };
