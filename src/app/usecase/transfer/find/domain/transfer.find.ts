import { Uuid } from "../../../../shared/domain/valueobjects/uuid";
import { TransferCoins } from "../../shared/domain/transfer";


export interface ITransferFind {
    allByUserCreate(userCreateId: Uuid): Promise<TransferCoins[]>
    allByUserTarget(userDetinationId: Uuid): Promise<TransferCoins[]>
}