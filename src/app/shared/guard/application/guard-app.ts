import { userFindPrisma } from "../../../usecase/user/find/repository/user.find.prisma"
import { IUserFindRepository } from "../../../usecase/user/find/domain/user.find"
import { IParamsUser, User } from "../../../usecase/user/shared/domain/user"
import { JwtRepository } from "../../../common/libs/encoder/encoder.jwt"
import { IEncoderAPP } from "../../../common/libs/encoder/IEncoder"
import { EmailAddres } from "../../domain/valueobjects/emailaddres"
import { ErrorNotExists } from "../../domain/errors/notexists.error"
import { IPayloadAPP } from "../../domain/IPayloadAPP"
import { Uuid } from "../../domain/valueobjects/uuid"

export class KeyAppService {

    constructor(
        private readonly provider: IEncoderAPP<IPayloadAPP>,
        private readonly repository: IUserFindRepository
    ) {
    }
    async getKey(payload: IPayloadAPP): Promise<string> {
        const key = this.provider.getKey(payload)
        return key
    }
    async decodedKey(key: string): Promise<User> {
        try {
            const payload = await this.provider.decodedKey(key)
            const id = new Uuid(payload.id)
            const user = await this.repository.byId(id)
            if (user == undefined) throw new ErrorNotExists("User not exists")
            const { name, password, email,  } = user

            const paramsUser: IParamsUser = {
                id,
                name,
                password,
                email: new EmailAddres(email),
                balance: undefined,
            }
            const currentUser = new User(paramsUser)
            return currentUser
        } catch (error) {
            throw error
        }
    }
}


const jwtRepository = new JwtRepository<IPayloadAPP>()
const keyAppUseCase = new KeyAppService(jwtRepository, userFindPrisma)
export { keyAppUseCase }