
export interface IEncoderAPP<T> {
    getKey(payload: T): Promise<string>
    decodedKey(key: string): Promise<T>
}