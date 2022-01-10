import { CONFIG } from "../../config/config";
import { IEncoderAPP } from "./IEncoder";
import jwt from 'jsonwebtoken'


export class JwtRepository<T> implements IEncoderAPP<T> {

    private readonly secret : string

    constructor(){
        this.secret = CONFIG.SECRET_ENCODER
    }


    getKey(payload: T): Promise<string> {
        try {
            return Promise.resolve(jwt.sign((payload as any),this.secret ))
        } catch (error) { throw error }
    }

    decodedKey(key: string): Promise<T> {
        try {
            return new Promise((res, rej) => {
                jwt.verify(key, this.secret, function (err, decoded: any) {
                    if (err) { return rej(err); }
                    res(decoded);
                });
            });
        } catch (error) { throw error }
    }
}
