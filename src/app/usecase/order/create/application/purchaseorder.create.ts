import { ErrorInsufficientFunds } from "../../../../shared/domain/errors/insufficient-funds.error";
import { ErrorRequiredArgument } from "../../../../shared/domain/errors/invalid-argument.error";
import { UserBalanceCommonService } from "../../../user/shared/domain/user.balance";
import { IProductFindRepository } from "../../../product/find/domain/product.find";
import { KeyAppService } from "../../../../shared/guard/application/guard-app";
import { Order, orderProductParams } from "../../shared/domain/order-purchase";
import { IPurchaseOrderCreate } from "../domain/purchaseorder.create";
import { Uuid } from "../../../../shared/domain/valueobjects/uuid";
import { purchaseOrderCreateDTO } from "./dto";


export class PurchaseOrderCreate {

    constructor(
        private readonly decodedKeyAPP: KeyAppService,
        private readonly userCoins: UserBalanceCommonService,
        private readonly productFind: IProductFindRepository,
        private readonly createOrder: IPurchaseOrderCreate
    ) { }

    async handle(key: string, param: purchaseOrderCreateDTO) {
        try {
            if (param.products.length === 0) throw new ErrorRequiredArgument("Products1")
            const currentuser = await this.decodedKeyAPP.decodedKey(key)
            const produsctsId = param.products.map(item => new Uuid(item.id))
            const productsFind = await this.productFind.byIds(produsctsId)

            const products: orderProductParams[] = productsFind.map(item => {
                const quantity = param.products.find(pro => pro.id === item.id.value)
                if (quantity === undefined) throw new ErrorRequiredArgument("Quantity")
                const productId = item.id
                const productValue = item.price
                return { productId, productValue, quantity: quantity.quantity, }
            })
            await this.validCoins(currentuser.id, products)

            const order = new Order({ idUser: currentuser.id, orderDetails: products })
            await this.createOrder.handle(order)
            return order.toPrimitives()
        } catch (error) {
            throw error;
        }
    }

    private async validCoins(userid: Uuid, products: orderProductParams[]) {
        try {
            const costProducts = products.map(item => item.productValue.amount * item.quantity)
            const currentCoins = await this.userCoins.getAmount(userid)
            const totalCost = costProducts.reduce((prev, curr) => prev + curr, 0)
            if (currentCoins.amount < totalCost) throw new ErrorInsufficientFunds()
        } catch (error) {
            throw error;
        }
    }




}