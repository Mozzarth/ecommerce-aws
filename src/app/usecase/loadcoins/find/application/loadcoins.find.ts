import { KeyAppService } from "../../../../shared/guard/application/guard-app";
import { ILoadCoinsFind } from "../domain/loadcoins.find";


export class LoadCoinsFindService {

    constructor(
        private readonly decodedKeyAPP: KeyAppService,
        private readonly loadCoinsFind: ILoadCoinsFind
    ) { }

    async all(key : string){
        try {
            const currentUser = await this.decodedKeyAPP.decodedKey(key)
            const loadCoinsFind = await this.loadCoinsFind.all(currentUser.id)
            return loadCoinsFind.map(loadCoins => loadCoins.toPrimitives())
        } catch (error) {
            throw error;
        }
    }


}