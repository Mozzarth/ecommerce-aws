import { balanceUserService } from "../app/usecase/balance/find/application"

module.exports.balance = async function (event: any) {
    let statusCode = 200
    let message = undefined
    let balance = undefined
    const key = event.headers.Authorization
    try {
        balance = await balanceUserService.handle(key)
    } catch (error: any) {
        statusCode = 500
        message = error.message
    }
    const res = {
        statusCode,
        body: JSON.stringify({ message, balance }, null, 2)
    }
    return res
}
module.exports.amount = async function (event: any) {
    let statusCode = 200
    let message = undefined
    let amount = undefined
    const key = event.headers.Authorization
    try {
        amount = await balanceUserService.amount(key)
    } catch (error: any) {
        statusCode = 500
        message = error.message
    }
    const res = {
        statusCode,
        body: JSON.stringify({ message, amount }, null, 2)
    }
    return res
}