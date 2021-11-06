import { getCustomRepository } from "typeorm"
import { CartsRepository } from "../repositories/CartsRepository"


class CartsService {



  async createCart(user_id: string) {
    
    if (!user_id) {
      throw new Error('Dados preenchidos de forma incorreta!')
    }

    const cartsRepository = getCustomRepository(CartsRepository)
    
    const cart = cartsRepository.create({user_id})

    if (cart) {
      await cartsRepository.save(cart)
      return cart
    }

    throw new Error('Não foi possível criar o carrinho')
  }

  async getUserByCart(cart_id: string) {
    if (!cart_id) {
      throw new Error('Dados preenchidos de forma incorreta!')
    }

    const cartsRepository = getCustomRepository(CartsRepository)
    
    const cart = cartsRepository.findOne({where: {id: cart_id}, relations: ['user']})

    if (cart) {
      return cart
    }

    throw new Error('Não foi possível encontrar o usuário')
  }
}

export { CartsService }