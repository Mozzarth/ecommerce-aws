

export class Divisa {

    public readonly amount: number;

    constructor(amount: number) {
        this.amount = Number(amount)
    }

    toPrimitives() {
        return this.amount
    }


}