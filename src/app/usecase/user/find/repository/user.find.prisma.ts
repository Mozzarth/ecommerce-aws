import { EmailAddres } from "../../../../shared/domain/valueobjects/emailaddres";
import { IUserFind, IUserFindRepository } from "../domain/user.find";
import { Uuid } from "../../../../shared/domain/valueobjects/uuid";
import { PrismaClient } from '@prisma/client'


export class UserFindPrisma implements IUserFindRepository {

    private readonly prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async all(): Promise<IUserFind[]> {
        try {
            const users = await this.prisma.users.findMany();
            return users.map(user => { return { idUser: user.id, ...user } })
        } catch (error) {
            throw error;
        }
    }
    async byId(id: Uuid): Promise<IUserFind | undefined> {
        try {
            const user = await this.prisma.users.findUnique({ where: { id: id.value } });
            return user ? { idUser: user.id, ...user } : undefined;
        } catch (error) {
            throw error;
        }
    }
    async byEmail(email: EmailAddres): Promise<IUserFind | undefined> {
        try {
            const user = await this.prisma.users.findUnique({ where: { email: email.toString() } });
            return user ? { idUser: user.id, ...user } : undefined;
        } catch (error) {
            throw error;
        }
    }

}

const userFindPrisma = new UserFindPrisma();
export { userFindPrisma };