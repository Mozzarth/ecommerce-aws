export class ErrorInvalidEmail extends Error {

    constructor(public readonly email: string) {
        super("Invalid email: "+email)
    }

}