import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import LogInterface from '../../interfaces/log/log.interface'
import UsersInterface from '../../interfaces/users/users.interface'
import { LogService } from '../../mongodb/mongo.service'

const prisma = new PrismaClient()
export default class UsersController {

  static async findAll () {

    try {     

      return await prisma.users.findMany()

    } catch (error) {    
      
      const data = {
        description: 'Cannot find users'
      } as LogInterface

      await LogService(data)

      return await error
    }
  }


  static async create (req: UsersInterface) { 

    const data = req
    
    try {  

      data.password = await bcrypt.hash(req.password, 10)
      
      return await prisma.users.create({
        data
      })  

    } catch (error) {  

     return error
  }  
}

  static async update (id: string, request: UsersInterface) {

    try {
        
        const data = request

        data.password = await bcrypt.hash(request.password, 10)
  
        return await prisma.users.update({
          where: {
            id: Number(id),
          },
          data,
        })  

    } catch (error) {

      return error
    }
  }

  static async delete (id: string) {

    try {

      await prisma.users.delete({
        where: {
          id: Number(id),
        },
      })

    } catch (error) {

      return error
    }
  }
}