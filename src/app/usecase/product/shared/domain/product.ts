import { Uuid } from "../../../../shared/domain/valueobjects/uuid";
import { Divisa } from "../../../../shared/domain/valueobjects/divisa";


export type paramsProduct = {
    id?: Uuid;
    description: string;
    price : Divisa
}

export class Product {

    public readonly id: Uuid;
    public readonly description: string;
    public readonly price: Divisa;

    constructor(params: paramsProduct) {
        this.id = params.id == undefined ? Uuid.random() : params.id;
        this.description = params.description,
        this.price = params.price
    }

    toPrimitives(){
        return {
            id: this.id.value,
            description: this.description,
            price: this.price.amount
        }
    }

}