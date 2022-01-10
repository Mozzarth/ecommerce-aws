import { Order } from "../../shared/domain/order-purchase";

export interface IPurchaseOrderCreate {
    handle(order: Order): Promise<void>
}