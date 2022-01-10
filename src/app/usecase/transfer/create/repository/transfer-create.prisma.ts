import { ITransferCoinsCreate, } from "../domain/transfer.create";
import { TransferCoins } from "../../shared/domain/transfer";
import { PrismaClient } from '@prisma/client';


export class TransferCoinsCreatePrisma implements ITransferCoinsCreate {

    private readonly prisma: PrismaClient

    constructor() {
        this.prisma = new PrismaClient()
    }

    async handle(params: TransferCoins): Promise<void> {
        try {
            await this.prisma.transfersCoins.create({
                data: {
                    id: params.id.toString(),
                    userSourceId: params.userSourceId.toString(),
                    userTargetId: params.userDestinationId.toString(),
                    quantity: params.coins.amount
                }
            })
        } catch (error) {
            throw error;
        }
    }
}

const transferCoinsCreatePrisma = new TransferCoinsCreatePrisma()
export { transferCoinsCreatePrisma }