import { Uuid } from "../../../../shared/domain/valueobjects/uuid";

export interface IOrderDetailFinds {
    id: string;
    productId: string;
    quantity: number;
    priceProduct: number;
}

export interface IOrderFinds {
    id: string;
    idUser: string;
    orderDetails: IOrderDetailFinds[];
}

export interface IOrderFind {
    all(idUser: Uuid): Promise<IOrderFinds[]>
    byId(idOrder: Uuid): Promise<IOrderFinds | undefined>
}