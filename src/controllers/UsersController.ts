import { Request, Response } from "express";
import { UsersService } from "../services/UsersService";


class UsersController {


  async create(request: Request, response: Response): Promise<Response> {

    const { name, email, password } = request.body

    const usersService = new UsersService()

    try {
      const user = await usersService.createNewUser(name, email, password)

      return response.json(user)
    } catch (error) {
      console.log(error)
      return response.status(422).json({
        message: error.message
      })
    }
  }

  async find(request: Request, response: Response): Promise<Response> {

    const { id } = request.params

    const usersService = new UsersService()

    try {
      const user = await usersService.findById(id)

      return response.json(user)
    } catch (error) {
      console.log(error)
      return response.status(404).json({
        message: error.message
      })
    }

  }

  async index(request: Request, response: Response): Promise<Response> {

    const usersService = new UsersService()

    try {
      const users = await usersService.listAllUsers()

      return response.json(users)
    } catch (error) {
      console.log(error)
      return response.status(404).json({
        message: error.message
      })
    }

  }
  
}

export { UsersController }