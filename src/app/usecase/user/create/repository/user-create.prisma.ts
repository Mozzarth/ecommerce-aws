import { IUserCreateRepository } from "../domain/user.create";
import { User } from "../../shared/domain/user";
import { PrismaClient } from '@prisma/client'


export class UserCreatePrisma implements IUserCreateRepository {

    private readonly prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient()
    }

    async handle(user: User): Promise<void> {
        try {
            await this.prisma.users.create({
                data: user.toPrimitives()
            })
        } catch (error) {
            throw error
        }
    }
}


const userCreatePrisma = new UserCreatePrisma()
export { userCreatePrisma };