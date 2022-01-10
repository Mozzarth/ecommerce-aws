import { UserBalanceCommonService } from "../../../user/shared/domain/user.balance";
import { KeyAppService } from "../../../../shared/guard/application/guard-app";
import { Divisa } from "../../../../shared/domain/valueobjects/divisa";
import { Uuid } from "../../../../shared/domain/valueobjects/uuid";
import { ITransferCoinsCreate } from "../domain/transfer.create";
import { TransferCoins } from "../../shared/domain/transfer";
import { transferCreateDTO } from "./dto";
import { ErrorInsufficientFunds } from "../../../../shared/domain/errors/insufficient-funds.error";



export class TransferCreateService {


    constructor(
        private readonly decodedKeyAPP: KeyAppService,
        private readonly userCoins: UserBalanceCommonService,
        private readonly transferCoinsCreate: ITransferCoinsCreate
    ) {    }


    //TODO Validar que la cantidad a enviar sea mayor a 0 y que sea menor al saldo del usuario
    async handle(key: string, params: transferCreateDTO) {
        try {
            const currentUser = await this.decodedKeyAPP.decodedKey(key)
            await this.validCoins(currentUser.id, Number(params.coins))

            const userSourceId = currentUser.id
            const userDestinationId = new Uuid(params.idUser)
            const coins = new Divisa(params.coins)

            const transfer = new TransferCoins({ coins, userSourceId,userDestinationId  })
            await this.transferCoinsCreate.handle(transfer)
            return transfer.toPrimitives()
        } catch (error) {
            throw error;
        }
    }

    private async validCoins(userId : Uuid ,coinsToSend : number){
        const coinsUser = await this.userCoins.getAmount(userId)
        if (coinsUser.amount < coinsToSend ) throw new ErrorInsufficientFunds()
    }


}