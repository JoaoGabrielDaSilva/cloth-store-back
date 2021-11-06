import { createConnection, getCustomRepository, Repository } from "typeorm"
import { User } from "../entities/User"
import { UsersRepository } from "../repositories/UsersRepository"


class UsersService {


  async createNewUser(name: string, email: string, password: string) {
    
    if (!name || !email || !password) {
      throw new Error('Dados preenchidos de forma incorreta!')
    }

    const usersRepository = getCustomRepository(UsersRepository)
    
    const user = usersRepository.create({
      name, email, password
    })

    if (user) {
      await usersRepository.save(user)
      return user
    }

    throw new Error('Não foi possível cadastrar o usuário')
  }

  async findById(id: string) {
    const usersRepository = getCustomRepository(UsersRepository)
    
    console.log(id);
    

    const user = usersRepository.findOne({id}, {relations: ['cart']})

    if (user) {
      return user
    } 

    throw new Error('Não foi possível encontrar o usuário')
  }

  async listAllUsers() {
    const usersRepository = getCustomRepository(UsersRepository)
    
    const users = usersRepository.find({ select: ['name', 'id', 'email']})
    
    if (users) {
      return users
    } 

    throw new Error('Não foi possível encontrar nenhum usuário')
  }
}

export { UsersService }