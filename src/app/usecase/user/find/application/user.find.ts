import { EmailAddres } from "../../../../shared/domain/valueobjects/emailaddres";
import { KeyAppService } from "../../../../shared/guard/application/guard-app";
import { Uuid } from "../../../../shared/domain/valueobjects/uuid";
import { IUserFindRepository } from "../domain/user.find";



export class UserFindService {

    constructor(
        private readonly decodedKeyAPP: KeyAppService,
        private readonly repository: IUserFindRepository) { }

    async byId(key: string, id: string) {
        try {
            await this.getCurrentUser(key)
            const uuid = new Uuid(id)
            const user = await this.repository.byId(uuid)
            return user
        } catch (error) {
            throw error
        }
    }
    async byEmail(key: string, email: string) {
        try {
            await this.getCurrentUser(key)
            const emailAdress = new EmailAddres(email)
            const user = await this.repository.byEmail(emailAdress)
            if (user) {
                let userPrimitives = user
                return userPrimitives
            }
            return undefined
        } catch (error) {
            throw error
        }
    }
    async allUser(key: string) {
        try {
            await this.getCurrentUser(key)
            const users = await this.repository.all()
            return users
        } catch (error) {
            throw error
        }
    }

    private async getCurrentUser(key: string) {
        try {
            const currentUser = await this.decodedKeyAPP.decodedKey(key)
            return currentUser
        } catch (error) {
            throw error
        }
    }

}
