import { Divisa } from "../../../../shared/domain/valueobjects/divisa";
import { Uuid } from "../../../../shared/domain/valueobjects/uuid";

export type FundParams = {
    id?: Uuid;
    userDestinationId: Uuid;
    coins: Divisa;
}

// Fondeo
export class LoadCoins {

    public readonly id: Uuid;
    public readonly userId: Uuid;
    public readonly coins: Divisa;

    constructor(params: FundParams) {
        this.id = params.id || Uuid.random();
        this.userId = params.userDestinationId;
        this.coins = params.coins;
    }

    toPrimitives(){
        return {
            id: this.id.value,
            userId: this.userId.value,
            coins: this.coins.amount
        } 
    }

}