import { ErrorUserAlreadyExist } from "../../../../shared/domain/errors/user-exists.error";
import { ILoadCoinsCreate } from "../../../loadcoins/create/domain/loadcoind.create";
import { EmailAddres } from "../../../../shared/domain/valueobjects/emailaddres";
import { Divisa } from "../../../../shared/domain/valueobjects/divisa";
import { LoadCoins } from '../../../loadcoins/shared/domain/loadcoins';
import { IEncript } from "../../../../common/libs/encrypt/IEncrypts";
import { Uuid } from "../../../../shared/domain/valueobjects/uuid";
import { IUserFindRepository } from "../../find/domain/user.find";
import { IUserCreateRepository } from "../domain/user.create";
import { IUserRegisterDTO as IUserCreateDTO } from "./dto";
import { User } from "../../shared/domain/user";

export class UserRegisterService {

    constructor(
        private readonly repository: IUserCreateRepository,
        private readonly loadCoinsRepository: ILoadCoinsCreate,
        private readonly userFind: IUserFindRepository,
        private readonly encrypt: IEncript
    ) { }

    async handle(params: IUserCreateDTO) {
        try {
            const user = await this.buildUser(params)
            const load = await this.loadCoin(user.id, params.coins)
            await this.repository.handle(user)
            if (load) await this.loadCoinsRepository.handle(load)
            return user.toPrimitives()
        } catch (error) {
            throw error
        }
    }

    private async buildUser(params: IUserCreateDTO) {
        const email = new EmailAddres(params.email)
        const userFind = await this.userFind.byEmail(email)
        if (userFind != undefined) throw new ErrorUserAlreadyExist()

        const password = await this.encrypt.encrypt(params.password)
        const name = params.name
        const user = new User({ email, password, name })
        return user
    }

    private async loadCoin(userDestinationId: Uuid, coins: number) {
        try {
            if (coins <= 0) return undefined
            const divisa = new Divisa(coins)
            const load = new LoadCoins({ userDestinationId, coins: divisa })
            return load
        } catch (error) {
            throw error
        }
    }
}