import { LoadCoins } from "../../shared/domain/Loadcoins"

export interface ILoadCoinsCreate {
    handle(params: LoadCoins): Promise<void>
}