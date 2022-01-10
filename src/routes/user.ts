import { userCreateService } from "../app/usecase/user/create/application"
import { userAuthentication } from "../app/usecase/user/auth/application"
import { userFindService } from "../app/usecase/user/find/application"


module.exports.create = async function (event: any) {
    let statusCode = 201
    let message = undefined
    let user = undefined
    try {
        const { name, email, password, coins } = JSON.parse(event.body)
        user = await userCreateService.handle({ name, email, password, coins })
    } catch (error: any) {
        statusCode = 500
        message = error.message
    }
    const res = {
        statusCode,
        body: JSON.stringify({ message, user }, null, 2)
    }
    return res
}
module.exports.findall = async function (event: any) {
    let statusCode = 200
    let message = undefined
    let users = undefined
    const key = event.headers.Authorization
    try {
        users = await userFindService.allUser(key)
    } catch (error: any) {
        statusCode = 500
        message = error.message
    }
    const res = {
        statusCode,
        body: JSON.stringify({ message, users }, null, 2)
    }
    return res
}
module.exports.findbyid = async function (event: any) {
    let statusCode = 200
    let message = undefined
    let user = undefined
    const id = event.pathParameters.id
    const key = event.headers.Authorization
    try {
        user = await userFindService.byId(key, id)
    } catch (error: any) {
        statusCode = 500
        message = error.message
    }
    const res = {
        statusCode,
        body: JSON.stringify({ message, users: user }, null, 2)
    }
    return res
}

module.exports.userlogin = async function (event: any) {
    const { email, password } = JSON.parse(event.body)
    let statusCode = 200
    let message = undefined
    let key = undefined
    let user = undefined
    try {
        const infoLogin = await userAuthentication.handle({ email, password })
        key = infoLogin.key
        user = infoLogin.user
    } catch (error: any) {
        statusCode = 500
        message = error.message
    }
    const res = {
        statusCode,
        body: JSON.stringify({ message, user, key }, null, 2)
    }
    return res
}
