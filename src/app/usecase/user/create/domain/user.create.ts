import { User } from "../../shared/domain/user";


export interface IUserCreateRepository {
    handle(user: User): Promise<void>
}