import { userBalanceCommonService } from "../../../user/shared/domain/user.balance"
import { transferCoinsCreatePrisma } from "../repository/transfer-create.prisma"
import { keyAppUseCase } from "../../../../shared/guard/application/guard-app"
import { TransferCreateService } from "./transfer.create"


const transferCreateService = new TransferCreateService(
    keyAppUseCase,
    userBalanceCommonService,
    transferCoinsCreatePrisma
)
export { transferCreateService }