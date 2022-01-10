import { purchaseOrderCreate } from "../app/usecase/order/create/application"
import { orderFindService } from "../app/usecase/order/find/application"


module.exports.create = async function (event: any) {
    let statusCode = 201
    let message = undefined
    let order = undefined
    try {
        const key = event.headers.Authorization
        const { products } = JSON.parse(event.body)
        order = await purchaseOrderCreate.handle(key, { products })
    } catch (error: any) {
        statusCode = 500
        message = error.message
    }
    const res = {
        statusCode,
        body: JSON.stringify({ message, order }, null, 2)
    }
    return res
}
module.exports.all = async function (event: any) {
    let statusCode = 201
    let message = undefined
    let orders = undefined
    try {
        const key = event.headers.Authorization
        orders = await orderFindService.all(key)
    } catch (error: any) {
        statusCode = 500
        message = error.message
    }
    const res = {
        statusCode,
        body: JSON.stringify({ message, orders }, null, 2)
    }
    return res
}
