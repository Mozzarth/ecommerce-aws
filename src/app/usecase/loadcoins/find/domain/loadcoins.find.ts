import { Uuid } from "../../../../shared/domain/valueobjects/uuid";
import { LoadCoins } from "../../shared/domain/Loadcoins";


export interface ILoadCoinsFind {
    all(userId: Uuid): Promise<LoadCoins[]>
}