import { TransferCoins } from "../../../transfer/shared/domain/transfer";
import { LoadCoins } from "../../../loadcoins/shared/domain/Loadcoins";
import { Order } from "../../../order/shared/domain/order-purchase";
import { Uuid } from "../../../../shared/domain/valueobjects/uuid";


export type balanceParams = {
    userId: Uuid,
    orders: Order[]
    fund: LoadCoins[]
    transfersReceived: TransferCoins[]
    transfersSent: TransferCoins[]
}

export class Balance {

    public readonly userId: Uuid;
    public readonly orders: Order[];
    public readonly fund: LoadCoins[];
    public readonly transfersReceived: TransferCoins[];
    public readonly transfersSent: TransferCoins[];


    constructor(paras: balanceParams) {
        this.userId = paras.userId;
        this.orders = paras.orders;
        this.fund = paras.fund;
        this.transfersReceived = paras.transfersReceived;
        this.transfersSent = paras.transfersSent;
    }

    toPrimitives() {
        return {
            userId: this.userId.value,
            orders: this.orders.map(order => order.toPrimitives()),
            fund: this.fund.map(fund => fund.toPrimitives()),
            transfersReceived: this.transfersReceived.map(transfer => transfer.toPrimitives()),
            transfersSent: this.transfersSent.map(transfer => transfer.toPrimitives())
        }
    }

}