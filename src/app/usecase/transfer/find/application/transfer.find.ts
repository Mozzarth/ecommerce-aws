import { KeyAppService } from "../../../../shared/guard/application/guard-app";
import { ITransferFind } from "../domain/transfer.find";



export class TransferFindService {

    constructor(
        private readonly decodedKeyAPP: KeyAppService,
        private readonly repository: ITransferFind) { }


    //Cuando el usuario envía una transferencia
    async allByUserCreate(key: string) {
        try {
            const currentUser = await this.decodedKeyAPP.decodedKey(key)
            const transfer = await this.repository.allByUserCreate(currentUser.id)
            return transfer.map(transfer => (transfer.toPrimitives()))
        } catch (error) {
            throw error;
        }
    }
    //Cuando el usuario recibe una transferencia
    async allByUserTarget(key: string) {
        try {
            const currentUser = await this.decodedKeyAPP.decodedKey(key)
            const transfer = await this.repository.allByUserTarget(currentUser.id)
            return transfer.map(transfer => (transfer.toPrimitives()))
        } catch (error) {
            throw error;
        }
    }




}