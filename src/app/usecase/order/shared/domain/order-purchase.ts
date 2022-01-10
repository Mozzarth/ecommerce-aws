import { Divisa } from "../../../../shared/domain/valueobjects/divisa";
import { Uuid } from "../../../../shared/domain/valueobjects/uuid";


export type orderProductParams = { orderId?: Uuid, productId: Uuid, productValue: Divisa, quantity: number }

export type OrderParams = {
    id?: Uuid,
    idUser: Uuid,
    orderDetails: orderProductParams[]
}

export class Order {

    public readonly id: Uuid
    public readonly idUser: Uuid
    public readonly orderDetails: { id: Uuid, productId: Uuid, productValue: Divisa, quantity: number }[]

    constructor(params: OrderParams) {
        this.id = params.id || Uuid.random()
        this.idUser = params.idUser
        this.orderDetails = params.orderDetails.map(item =>  {
            return {
                id: item.orderId || Uuid.random(),
                productId: item.productId,
                quantity: item.quantity,
                productValue: item.productValue,
            }
        })
    }

    toPrimitives() {
        return {
            id: this.id.value,
            idUser: this.idUser.value,
            products: this.orderDetails.map(item => {
                return {
                    id: item.id.value,
                    quantity: item.quantity,
                    productId: item.productId.value,
                    productValue: item.productValue.amount
                }
            })
        }
    }



}