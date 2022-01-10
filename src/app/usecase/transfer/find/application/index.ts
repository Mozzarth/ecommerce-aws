import { keyAppUseCase } from "../../../../shared/guard/application/guard-app";
import { transferFindPrisma } from "../repository/transfer-find.prisma";
import { TransferFindService } from "./transfer.find";


const transferFindService = new TransferFindService(
    keyAppUseCase,
    transferFindPrisma
)

export { transferFindService }