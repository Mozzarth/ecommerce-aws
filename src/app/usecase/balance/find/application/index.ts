import { userBalanceCommonService } from "../../../user/shared/domain/user.balance";
import { keyAppUseCase } from "../../../../shared/guard/application/guard-app";
import { BalanceUserService } from "./balance.find";


const balanceUserService = new BalanceUserService(
    keyAppUseCase,
    userBalanceCommonService
)

export { balanceUserService }