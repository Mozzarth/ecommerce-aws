import { KeyAppService } from "../../../../shared/guard/application/guard-app";
import { Divisa } from "../../../../shared/domain/valueobjects/divisa";
import { ILoadCoinsCreate } from "../domain/loadcoind.create";
import { LoadCoins } from "../../shared/domain/Loadcoins";
import { fundCreateDTO } from "./dto";



export class LoadCoinsCreateService {


    constructor(
        private readonly decodedKeyAPP: KeyAppService,
        private readonly loadCoins: ILoadCoinsCreate
    ) {

    }

    async handle(key: string, params: fundCreateDTO) {
        try {
            const currentUser = await this.decodedKeyAPP.decodedKey(key)
            const userDestinationId = currentUser.id
            const coins = new Divisa(params.coins)
            const loadCoins = new LoadCoins({ userDestinationId, coins })
            await this.loadCoins.handle(loadCoins)
            return loadCoins.toPrimitives()
        } catch (error) {
            throw error;
        }
    }


}