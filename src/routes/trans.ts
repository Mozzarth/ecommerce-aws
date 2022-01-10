import { transferCreateService } from "../app/usecase/transfer/create/application";
import { transferFindService } from "../app/usecase/transfer/find/application";



module.exports.create = async function (event: any) {
    let statusCode = 200
    let message = undefined
    let trans = undefined
    try {
        const key = event.headers.Authorization
        const { userTargetId, coins } = JSON.parse(event.body)
        trans = await transferCreateService.handle(key, { coins, idUser: userTargetId })
    } catch (error: any) {
        statusCode = 500
        message = error.message
    }
    const res = {
        statusCode,
        body: JSON.stringify({ message, trans }, null, 2)
    }
    return res
}

//Envios
module.exports.allByUserCreate = async function (event: any) {
    let statusCode = 200
    let message = undefined
    let trans = undefined
    try {
        const key = event.headers.Authorization
        trans = await transferFindService.allByUserCreate(key)
    } catch (error: any) {
        statusCode = 500
        message = error.message
    }
    const res = {
        statusCode,
        body: JSON.stringify({ message, trans }, null, 2)
    }
    return res
}

//Recibidas
module.exports.allByUserTarget = async function (event: any) {
    let statusCode = 200
    let message = undefined
    let trans = undefined
    try {
        const key = event.headers.Authorization
        trans = await transferFindService.allByUserTarget(key)
    } catch (error: any) {
        statusCode = 500
        message = error.message
    }
    const res = {
        statusCode,
        body: JSON.stringify({ message, trans }, null, 2)
    }
    return res
}