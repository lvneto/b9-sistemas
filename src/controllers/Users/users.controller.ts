import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import UsersInterface from '../../interfaces/users.interface';

const prisma = new PrismaClient()
export default class UsersController {
  static async create (req: UsersInterface): Promise<UsersInterface> { 

   const data = req
    
   data.password = await bcrypt.hash(req.password, 10);

    await prisma.users.create({
       data 
    })
    return data
  } 

  static async findAll (): Promise<UsersInterface[]> {
    const users = await prisma.users.findMany({
      skip: 0,
      take: 10,
    })
    return users
  }

  static async update (id: string, request: UsersInterface): Promise<UsersInterface> {

    const data = request

    data.password = await bcrypt.hash(data.password, 10);
    const user = await prisma.users.update({
      where:  { id: Number(id) },
      data
    })
    return user
  }
}