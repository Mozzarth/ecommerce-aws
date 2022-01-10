import { Uuid } from "../../../../shared/domain/valueobjects/uuid";
import { Product } from "../../shared/domain/product";


export interface IProductFindRepository {
    all(): Promise<Product[]>
    byId(id : Uuid): Promise<Product | undefined>
    byIds(id : Uuid[]): Promise<Product[]>
}