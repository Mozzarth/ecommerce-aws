
export class ErrorInvalidArgument  extends Error {

    constructor() {
        super("Invalid argument")
    }

}

export class ErrorRequiredArgument extends Error {

    constructor(nameArgument: string) {
        super(`${nameArgument} is required`)
    }

}