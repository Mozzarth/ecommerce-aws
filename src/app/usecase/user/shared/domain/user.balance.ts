import { loadCoinsFindPrisma } from "../../../loadcoins/find/repository/loadcoins-find.prisma";
import { transferFindPrisma } from "../../../transfer/find/repository/transfer-find.prisma";
import { orderFindPrisma } from "../../../order/find/repository/order-find.prisma";
import { ILoadCoinsFind } from "../../../loadcoins/find/domain/loadcoins.find";
import { ITransferFind } from "../../../transfer/find/domain/transfer.find";
import { Divisa } from "../../../../shared/domain/valueobjects/divisa";
import { Order } from "../../../order/shared/domain/order-purchase";
import { Uuid } from "../../../../shared/domain/valueobjects/uuid";
import { IOrderFind } from "../../../order/find/domain/order.find";
import { Balance } from "../../../balance/shared/domain/balance";


//Bridge
export class UserBalanceCommonService {

    constructor(
        private readonly loadCoins: ILoadCoinsFind,
        private readonly order: IOrderFind,
        private readonly transfer: ITransferFind
    ) {
    }


    async getBalance(id: Uuid): Promise<Balance> {
        try {
            const loadCoins = await this.loadCoins.all(id)
            const orders = await this.getOrders(id)
            const transfersReceived = await this.transfer.allByUserTarget(id)
            const transfersSent = await this.transfer.allByUserCreate(id)

            const balance = new Balance({
                userId: id,
                orders,
                fund: loadCoins,
                transfersSent,
                transfersReceived
            })
            return balance;
        } catch (error) {
            throw error;
        }
    }


    async getOrders(id: Uuid): Promise<Order[]> {
        try {
            const orders = await this.order.all(id)
            return orders.map(order => new Order({
                id: new Uuid(order.id),
                idUser: new Uuid(order.idUser),
                orderDetails: order.orderDetails.map(orderDetail => ({
                    id: new Uuid(orderDetail.id),
                    productId: new Uuid(orderDetail.productId),
                    quantity: orderDetail.quantity,
                    productValue: new Divisa(orderDetail.priceProduct)
                }))
            }))
        } catch (error) {
            throw error
        }
    }

    async getAmount(id: Uuid): Promise<Divisa> {
        try {
            const balance = await this.getBalance(id)

            const products = balance.orders.map(order => order.orderDetails).reduce((prev, curr) => prev.concat(curr), [])
            const loadCoins = balance.fund.map(fund => fund.coins.amount).reduce((prev, curr) => prev + curr, 0)
            const orderCosts = products.map(product => product.productValue.amount * product.quantity).reduce((prev, curr) => prev + curr, 0)
            const transfersSent = balance.transfersSent.map(transfer => transfer.coins.amount).reduce((prev, curr) => prev + curr, 0)
            const transfersReceived = balance.transfersReceived.map(transfer => transfer.coins.amount).reduce((prev, curr) => prev + curr, 0)
            const deductions = (transfersSent + orderCosts)
            const totalCoins = loadCoins + transfersReceived - deductions
            return new Divisa(totalCoins)
        } catch (error) {
            throw error;
        }
    }
}

const userBalanceCommonService = new UserBalanceCommonService(
    loadCoinsFindPrisma,
    orderFindPrisma,
    transferFindPrisma
)
export { userBalanceCommonService }