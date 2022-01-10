import { ErrorNotExists as UserNotExistsError } from "../../../../shared/domain/errors/notexists.error";
import { UserCredentialInvalid } from "../../../../shared/domain/errors/user-invalidcredential.error";
import { EmailAddres } from "../../../../shared/domain/valueobjects/emailaddres";
import { KeyAppService } from "../../../../shared/guard/application/guard-app";
import { IEncript } from "../../../../common/libs/encrypt/IEncrypts";
import { IUserFindRepository } from "../../find/domain/user.find";
import { IUserLoginDTO } from "./dto";


export class UserAuthenticationService {

    constructor(
        private readonly repository: IUserFindRepository,
        private readonly decodedKeyAPP: KeyAppService,
        private readonly encrypt: IEncript
    ) { }


    async handle(params: IUserLoginDTO) {
        try {
            const { email, password } = params
            const emailAddres = new EmailAddres(email)
            const user = await this.getUser(emailAddres)
            await this.verifyCredentials(password, user.password)
            const key = await this.decodedKeyAPP.getKey({ id: user.idUser })
            return { key, user }
        } catch (error) {
            throw error
        }
    }

    async getUser(email: EmailAddres) {
        const user = await this.repository.byEmail(email)
        if (user == undefined) throw new UserNotExistsError("User not exists")
        return user
    }
    async verifyCredentials(text : string, hash: string) {
        const validCredential = await this.encrypt.compare(text, hash)
        if (!validCredential) throw new UserCredentialInvalid()
    }

}