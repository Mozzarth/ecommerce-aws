import { keyAppUseCase } from "../../../../shared/guard/application/guard-app";
import { userFindPrisma } from "../repository/user.find.prisma";
import { UserFindService } from "./user.find";


const userFindService = new UserFindService(
    keyAppUseCase,
    userFindPrisma
)
export { userFindService }