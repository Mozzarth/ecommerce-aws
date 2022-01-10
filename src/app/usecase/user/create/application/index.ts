import { loadCoinsCreatePrisma } from "../../../loadcoins/create/repository/loadcoind-create.prisma"
import { encryptBcrypt } from "../../../../common/libs/encrypt/encrypt.bcrypt"
import { userFindPrisma } from "../../find/repository/user.find.prisma"
import { userCreatePrisma } from "../repository/user-create.prisma"
import { UserRegisterService } from "./user.register"


const userCreateService = new UserRegisterService(
    userCreatePrisma,
    loadCoinsCreatePrisma,
    userFindPrisma,
    encryptBcrypt
)

export { userCreateService }