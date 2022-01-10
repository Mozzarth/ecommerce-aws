import { keyAppUseCase } from "../../../../shared/guard/application/guard-app";
import { productFindDummy } from "../infrastructure/product-find.dummy";
import { ProductFindService } from "./product.find";


const productFindService = new ProductFindService(
    keyAppUseCase,
    productFindDummy
)

export { productFindService }