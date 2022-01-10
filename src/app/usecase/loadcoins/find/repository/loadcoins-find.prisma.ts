import { Divisa } from "../../../../shared/domain/valueobjects/divisa";
import { Uuid } from "../../../../shared/domain/valueobjects/uuid";
import { ILoadCoinsFind } from "../domain/loadcoins.find";
import { LoadCoins } from "../../shared/domain/Loadcoins";
import { PrismaClient } from '@prisma/client';

export class LoadCoinsFindPrisma implements ILoadCoinsFind {

    private readonly prisma: PrismaClient

    constructor() {
        this.prisma = new PrismaClient()
    }

    async all(userId: Uuid): Promise<LoadCoins[]> {
        try {
            const loadsFind = await this.prisma.loadCoins.findMany({
                where: {
                    userId: userId.value
                }
            })

            const loads = loadsFind.map(load => {
                return new LoadCoins({
                    id: new Uuid(load.id),
                    coins: new Divisa(load.quantity),
                    userDestinationId: new Uuid(load.userId)
                })
            })
            return loads
        } catch (error) {
            throw error;
        }
    }

}

const loadCoinsFindPrisma = new LoadCoinsFindPrisma()
export { loadCoinsFindPrisma }