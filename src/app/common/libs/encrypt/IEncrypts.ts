

export interface IEncript {

    encrypt(text: string): Promise<string>
    compare(text: string,hash : string): Promise<boolean>

}