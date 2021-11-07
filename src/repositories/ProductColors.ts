import { EntityRepository, Repository } from "typeorm";
import { ProductColor } from "../entities/ProductColor";

@EntityRepository(ProductColor)
class ProductColorsRepository extends Repository<ProductColor> {}

export { ProductColorsRepository };
