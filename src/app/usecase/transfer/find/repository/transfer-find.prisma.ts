import { Divisa } from "../../../../shared/domain/valueobjects/divisa";
import { Uuid } from "../../../../shared/domain/valueobjects/uuid";
import { TransferCoins } from "../../shared/domain/transfer";
import { ITransferFind } from "../domain/transfer.find";
import { PrismaClient } from '@prisma/client'

export class TransferFindPrisma implements ITransferFind {

    private readonly prisma: PrismaClient

    constructor() {
        this.prisma = new PrismaClient()
    }


    async allByUserCreate(userCreateId: Uuid): Promise<TransferCoins[]> {
        try {
            const transfers = await this.prisma.transfersCoins.findMany({
                where: { userSourceId: userCreateId.toString() }
            })

            return transfers.map(transfer => {
                const id = new Uuid(transfer.id)
                const coins = new Divisa(transfer.quantity)
                const userSourceId = new Uuid(transfer.userSourceId)
                const userDestinationId = new Uuid(transfer.userTargetId)
                const params = { id, coins, userSourceId, userDestinationId }
                return new TransferCoins(params)
            })
        } catch (error) {
            throw error;
        }
    }
    async allByUserTarget(userDetinationId: Uuid): Promise<TransferCoins[]> {
        try {
            const transfers = await this.prisma.transfersCoins.findMany({
                where: { userTargetId: userDetinationId.toString() }
            })

            return transfers.map(transfer => {
                const id = new Uuid(transfer.id)
                const coins = new Divisa(transfer.quantity)
                const userSourceId = new Uuid(transfer.userSourceId)
                const userDestinationId = new Uuid(transfer.userTargetId)
                const params = { id, coins, userSourceId, userDestinationId }
                return new TransferCoins(params)
            })
        } catch (error) {
            throw error;
        }
    }


}

const transferFindPrisma = new TransferFindPrisma()
export { transferFindPrisma }
