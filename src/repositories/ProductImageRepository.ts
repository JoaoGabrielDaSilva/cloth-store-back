import { EntityRepository, Repository } from "typeorm";
import { ProductImage } from "../entities/ProductImage";

@EntityRepository(ProductImage)
class ProductImagesRepository extends Repository<ProductImage> {}

export { ProductImagesRepository };
