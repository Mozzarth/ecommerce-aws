import { EmailAddres } from "../../../../shared/domain/valueobjects/emailaddres";
import { Uuid } from "../../../../shared/domain/valueobjects/uuid";


export interface IUserFind {
    idUser: string,
    email: string,
    name: string,
    password: string
}


export interface IUserFindRepository {
    all(): Promise<IUserFind[]>
    byId(id: Uuid): Promise<IUserFind | undefined>
    byEmail(email: EmailAddres): Promise<IUserFind | undefined>
}