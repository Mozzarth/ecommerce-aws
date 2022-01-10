import { keyAppUseCase } from "../../../../shared/guard/application/guard-app";
import { loadCoinsCreatePrisma } from "../repository/loadcoind-create.prisma";
import { LoadCoinsCreateService } from "./loadcoins.create";



const loadCoinsCreateService = new LoadCoinsCreateService(
    keyAppUseCase,
    loadCoinsCreatePrisma
)

export { loadCoinsCreateService }