import { IPurchaseOrderCreate } from "../domain/purchaseorder.create";
import { Order } from "../../shared/domain/order-purchase";
import { PrismaClient } from '@prisma/client'

export class OrderCreatePrisma implements IPurchaseOrderCreate {

    private readonly prisma: PrismaClient

    constructor() {
        this.prisma = new PrismaClient()
    }

    async handle(order: Order): Promise<void> {
        try {
            const id = order.id.value
            const userId = order.idUser.value
            await this.prisma.orders.create({
                data: {
                    id,
                    userId,
                    ordersDetails: {
                        create: order.orderDetails.map(item => {
                            return {
                                id: item.id.value,
                                quantity: item.quantity,
                                productId: item.productId.value,
                                priceProduct : item.productValue.amount                              
                            }
                        })
                    }
                }
            })
        } catch (error) {
            throw error;
        }
    }

}

const orderCreatePrisma = new OrderCreatePrisma()
export { orderCreatePrisma }
