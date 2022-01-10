import { Uuid } from "../../../../shared/domain/valueobjects/uuid";
import { IOrderFind, IOrderFinds } from "../domain/order.find";
import { PrismaClient } from "@prisma/client"


export class OrderFindPrisma implements IOrderFind {

    private readonly prisma: PrismaClient

    constructor() {
        this.prisma = new PrismaClient()
    }

    async all(id: Uuid): Promise<IOrderFinds[]> {
        try {
            const ordersFind = await this.prisma.orders.findMany({
                where: { userId: id.value },
                include: { ordersDetails: true }
            })
            const result: IOrderFinds[] = ordersFind.map(order => {
                return {
                    id: order.id,
                    idUser: order.userId,
                    orderDetails: order.ordersDetails.map(item => {
                        return {
                            id: item.id,
                            productId: item.productId,
                            quantity: item.quantity,
                            priceProduct: item.priceProduct
                        }
                    })
                }
            })
            return result;
        } catch (error) {
            throw error;
        }
    }

    async byId(idOrder: Uuid): Promise<IOrderFinds | undefined> {
        try {
            const orderFind = await this.prisma.orders.findUnique({
                where: { id: idOrder.value }, include: { ordersDetails: true }
            })
            return orderFind ? {
                id: orderFind.id,
                idUser: orderFind.userId,
                orderDetails: orderFind.ordersDetails.map(item => {
                    return {
                        id: item.id,
                        productId: item.productId,
                        quantity: item.quantity,
                        priceProduct: item.priceProduct
                    }
                })
            } : undefined
        } catch (error) {
            throw error;
        }
    }

}

const orderFindPrisma = new OrderFindPrisma()
export { orderFindPrisma }