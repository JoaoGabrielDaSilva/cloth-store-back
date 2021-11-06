import { EntityRepository, Repository } from "typeorm";
import { Cart } from "../entities/Cart";



@EntityRepository(Cart)
class CartsRepository extends Repository<Cart> {

}

export { CartsRepository}