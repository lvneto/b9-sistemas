import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import ClientsInterface from '../../interfaces/clients/clients.interface'
import LogInterface from '../../interfaces/log/log.interface'
import { logService } from '../../services/log.service'

  const prisma = new PrismaClient()

  export const findAll = async (request: Request, response: Response) => {

    try {

      const currentPage: any = request.query.page || 1;
      const take: any = request.query.limit || 10;
      const skip = (currentPage - 1) * take;

      return response.json(await prisma.clients.findMany(
        {
          skip,
          take
        }
      )) 

    } catch (error) {

      const data = {
        description: 'Cannot find clients'
      } as LogInterface

      await logService(data)

      return  response.json(error)
    }
}

  export const create = async (request: Request, response: Response) => { 

    const data: ClientsInterface = request.body
    
    try {              

      return response.json(await prisma.clients.create({
        data
      }))

    } catch (error) {  

      const data = {
        description: 'Cannot create products'
      } as LogInterface

      await logService(data)

      return response.json(error)
  }  
}

  export const update = async (request: Request, response: Response) => {

    try {
        
        const id: string = request.params.id
        const data: ClientsInterface = request.body 
          
        return response.json(await prisma.clients.update({
          where: {
            id: Number(id),
          },
          data,
        }))

    } catch (error) {

      const data = {
        description: 'Cannot update products'
      } as LogInterface

      await logService(data)

      return response.json(error)
    }
}

  export const remove = async (request: Request, response: Response) => {

    const id: string = request.params.id

    try {      

      return response.json(await prisma.clients.delete({
        where: {
          id: Number(id),
        },
      }))

    } catch (error) {

      const data = {
        description: 'Cannot delete products'
      } as LogInterface

      await logService(data)

      return response.json(error)
    }
}
