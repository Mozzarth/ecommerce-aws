import { ErrorInvalidEmail } from "../errors/email-invalid.error"



// Value Object
export class EmailAddres {

    private readonly value: string

    constructor(email: string) {
        this.isValidEmail(email)
        this.value = email.trim()
    }
    private isValidEmail(email: string) {
        const emailReg = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
        if (!emailReg.test(email)) { throw new ErrorInvalidEmail(email) }
    }

    public toEqual(email: string) {
        return this.value == email.trim()
    }
    public toString(): string {
        return this.value
    }

}