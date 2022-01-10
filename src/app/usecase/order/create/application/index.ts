import { keyAppUseCase } from "../../../../shared/guard/application/guard-app";
import { productFindDummy } from "../../../product/find/infrastructure/product-find.dummy";
import { userBalanceCommonService } from "../../../user/shared/domain/user.balance";
import { orderCreatePrisma } from "../repository/purcharseorder-create.prisma";
import { PurchaseOrderCreate } from "./purchaseorder.create";


const purchaseOrderCreate = new PurchaseOrderCreate(
    keyAppUseCase,
    userBalanceCommonService,
    productFindDummy,
    orderCreatePrisma

)

export { purchaseOrderCreate }