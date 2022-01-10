import { TransferCoins } from "../../shared/domain/transfer";


export interface ITransferCoinsCreate {
    handle(params: TransferCoins): Promise<void>
}