import { Uuid } from "../../../../shared/domain/valueobjects/uuid";
import { KeyAppService } from "../../../../shared/guard/application/guard-app";
import { IOrderFind } from "../domain/order.find";


export class OrderFindService {


    constructor(
        private readonly decodedKeyAPP: KeyAppService,
        private readonly orderFind: IOrderFind,
    ) { }



    async all(key: string) {
        try {
            const currentUser = await this.decodedKeyAPP.decodedKey(key)
            const orders = await this.orderFind.all(currentUser.id)
            return orders
        } catch (error) {
            throw error;
        }
    }

    async byIdOrder(key:string,orderId : string ){
        try {
            await this.decodedKeyAPP.decodedKey(key)
            const order = await this.orderFind.byId(new Uuid(orderId))
            return order
        } catch (error) {
            throw error;
        }
    }

}