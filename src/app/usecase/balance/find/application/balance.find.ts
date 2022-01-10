import { UserBalanceCommonService } from "../../../user/shared/domain/user.balance";
import { KeyAppService } from "../../../../shared/guard/application/guard-app";



export class BalanceUserService {


    constructor(
        private readonly decodedKeyAPP: KeyAppService,
        private readonly userBalanceCommon : UserBalanceCommonService){}


    async handle(key : string){
        try {
            const currentUser = await this.decodedKeyAPP.decodedKey(key)
            const userBalance = await this.userBalanceCommon.getBalance(currentUser.id)
            return userBalance.toPrimitives()
        } catch (error) {
            throw error
        }
    }
    async amount(key : string){
        try {
            const currentUser = await this.decodedKeyAPP.decodedKey(key)
            const userAmount = await this.userBalanceCommon.getAmount(currentUser.id)
            return userAmount.toPrimitives()
        } catch (error) {
            throw error
        }
    }

} 