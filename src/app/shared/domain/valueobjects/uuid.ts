import { v4, validate } from 'uuid'


export class Uuid {
    public readonly value: string

    constructor(value: string) {
        this.isValid(value)
        this.value = value
    }
    static random(): Uuid {
        return new Uuid(v4())
    }

    private isValid(value: string) {
        if (!validate(value)) { throw new Error(`Invalid uuid ${value} `) }
    }
    toString(): string {
        return this.value
    }
}