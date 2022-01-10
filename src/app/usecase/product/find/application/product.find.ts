import { KeyAppService } from "../../../../shared/guard/application/guard-app"
import { Uuid } from "../../../../shared/domain/valueobjects/uuid"
import { IProductFindRepository } from "../domain/product.find"


export class ProductFindService {

    constructor(
        private readonly decodedKeyAPP: KeyAppService,
        private readonly productRepository: IProductFindRepository
    ) { }


    async all(key : string) {
        try {
            await this.decodedKeyAPP.decodedKey(key)
            const products = await this.productRepository.all()
            return products.map(p => p.toPrimitives())
        } catch (error) {
            throw error
        }        
    }

    async byId(key : string,id: string) {
        try {
            await this.decodedKeyAPP.decodedKey(key)
            const uuid = new Uuid(id)
            const product = await this.productRepository.byId(uuid)
            return product ? product.toPrimitives() : undefined
        } catch (error) {
            throw error
        }
    }



}

