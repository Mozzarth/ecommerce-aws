
const CONFIG = {
    SECRET_ENCODER: process.env.NODE_APP_ENCODER || "encoder",
    SECRET_SALT: process.env.NODE_APP_SALT || 10,
}


export { CONFIG }