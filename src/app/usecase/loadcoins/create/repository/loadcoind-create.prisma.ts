import { ILoadCoinsCreate } from "../domain/loadcoind.create";
import { LoadCoins } from "../../shared/domain/Loadcoins";
import { PrismaClient } from '@prisma/client';


export class LoadCoinsCreatePrisma implements ILoadCoinsCreate {

    private readonly prisma: PrismaClient

    constructor() {
        this.prisma = new PrismaClient()
    }


    async handle(params: LoadCoins): Promise<void> {
        try {
            await this.prisma.loadCoins.create({
                data: {
                    id: params.id.value,
                    quantity: params.coins.amount,
                    userId: params.userId.value,
                }
            })
        } catch (error) {
            throw error;
        }
    }

}

const loadCoinsCreatePrisma = new LoadCoinsCreatePrisma()
export { loadCoinsCreatePrisma }