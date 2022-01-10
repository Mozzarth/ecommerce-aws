import { keyAppUseCase } from "../../../../shared/guard/application/guard-app";
import { orderFindPrisma } from "../repository/order-find.prisma";
import { OrderFindService } from "./order.find";


const orderFindService = new OrderFindService(
    keyAppUseCase,
    orderFindPrisma,
);

export { orderFindService };