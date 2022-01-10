import { encryptBcrypt } from "../../../../common/libs/encrypt/encrypt.bcrypt"
import { keyAppUseCase } from "../../../../shared/guard/application/guard-app"
import { userFindPrisma } from "../../find/repository/user.find.prisma"
import { UserAuthenticationService } from "./user.auth"


const userAuthentication = new UserAuthenticationService(userFindPrisma, keyAppUseCase, encryptBcrypt)
export { userAuthentication }