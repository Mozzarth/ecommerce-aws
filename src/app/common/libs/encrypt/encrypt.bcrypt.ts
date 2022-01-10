import { IEncript } from "./IEncrypts";
import bcryp from 'bcrypt'

class EncryptBcrypt implements IEncript {

    private readonly salt: number

    constructor() {
        this.salt = 12
    }

    async encrypt(text: string): Promise<string> {
        const hash = bcryp.hash(text, this.salt)
        return hash
    }
    async compare(text: string, hash: string): Promise<boolean> {
        const done = await bcryp.compare(text, hash)
        return done
    }

}
const encryptBcrypt = new EncryptBcrypt()
export { encryptBcrypt }
