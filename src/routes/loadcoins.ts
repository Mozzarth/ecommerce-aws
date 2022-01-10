import { loadCoinsCreateService } from "../app/usecase/loadcoins/create/application"
import { loadCoinsFindService } from "../app/usecase/loadcoins/find/application"



module.exports.load = async function (event: any) {
    let statusCode = 200
    let message = undefined
    let loadcoins = undefined
    try {
        const key = event.headers.Authorization
        const { coins } = JSON.parse(event.body)
        loadcoins = await loadCoinsCreateService.handle(key, { coins })
    } catch (error: any) {
        statusCode = 500
        message = error.message
    }
    const res = {
        statusCode,
        body: JSON.stringify({ message, loadcoins }, null, 2)
    }
    return res
}
module.exports.all = async function (event: any) {
    let statusCode = 200
    let message = undefined
    let loadcoins = undefined
    try {
        const key = event.headers.Authorization
        loadcoins = await loadCoinsFindService.all(key)
    } catch (error: any) {
        statusCode = 500
        message = error.message
    }
    const res = {
        statusCode,
        body: JSON.stringify({ message, loadcoins }, null, 2)
    }
    return res
}