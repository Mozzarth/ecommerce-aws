import { Divisa } from "../../../../shared/domain/valueobjects/divisa";
import { Uuid } from "../../../../shared/domain/valueobjects/uuid";

export type TransferParams = {
    id?: Uuid;
    userSourceId: Uuid;
    userDestinationId: Uuid;
    coins: Divisa;
}

// Transferencia de monedas
export class TransferCoins {

    public readonly id: Uuid;
    public readonly userSourceId: Uuid;
    public readonly userDestinationId: Uuid;
    public readonly coins: Divisa;

    constructor(params: TransferParams) {
        this.id = params.id || Uuid.random();
        this.userSourceId = params.userSourceId;
        this.userDestinationId = params.userDestinationId;
        this.coins = params.coins;
    }

    toPrimitives() {
        return {
            id: this.id.toString(),
            userSourceId: this.userSourceId.toString(),
            userDestinationId: this.userDestinationId.toString(),
            coins: this.coins.amount
        }
    }

}