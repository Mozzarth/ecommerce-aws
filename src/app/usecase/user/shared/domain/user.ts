import { EmailAddres } from "../../../../shared/domain/valueobjects/emailaddres";
import { Uuid } from "../../../../shared/domain/valueobjects/uuid";
import { Balance } from "../../../balance/shared/domain/balance";



export type IParamsUser = {
    id?: Uuid;
    name: string;
    password: string;
    balance?: Balance;
    email: EmailAddres;
};

export class User {

    public readonly id: Uuid;
    public readonly email: EmailAddres;
    public readonly name: string;
    public readonly password: string;
    public readonly balance?: Balance;
    // public readonly observaciones: string

    constructor(params: IParamsUser) {
        this.id = params.id == undefined ? Uuid.random() : params.id;
        this.balance = params.balance;
        this.email = params.email;
        this.name = params.name
        this.password = params.password;


    }
    toPrimitives() {
        const balance = this.balance == undefined ? undefined : this.balance.toPrimitives();
        return {
            id: this.id.value,
            name: this.name,
            password: this.password,
            email: this.email.toString(),
            balance
        };
    }
}