import { keyAppUseCase } from "../../../../shared/guard/application/guard-app";
import { loadCoinsFindPrisma } from "../repository/loadcoins-find.prisma";
import { LoadCoinsFindService } from "./loadcoins.find";


const loadCoinsFindService = new LoadCoinsFindService(
    keyAppUseCase,
    loadCoinsFindPrisma
);

export { loadCoinsFindService}