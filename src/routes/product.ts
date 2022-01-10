import { productFindService } from "../app/usecase/product/find/application"



module.exports.findall = async function (event: any) {
    let statusCode = 200
    let message = undefined
    let products = undefined
    try {
        const key = event.headers.Authorization
        products = await productFindService.all(key)
    } catch (error: any) {
        statusCode = 500
        message = error.message
    }
    const res = {
        statusCode,
        body: JSON.stringify({ message, products }, null, 2)
    }
    return res
}