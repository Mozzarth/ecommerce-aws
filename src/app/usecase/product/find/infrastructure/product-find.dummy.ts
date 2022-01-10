import { Divisa } from "../../../../shared/domain/valueobjects/divisa";
import { Uuid } from "../../../../shared/domain/valueobjects/uuid";
import { IProductFindRepository } from "../domain/product.find";
import { Product } from "../../shared/domain/product";
import { products } from "./products.dummy";




export class ProductFindDummy implements IProductFindRepository {


    async all(): Promise<Product[]> {
        return Promise.resolve(products.map(p => {
            const id = new Uuid(p.id);
            const price = new Divisa(p.price);
            return new Product({
                id, description: p.description, price
            })
        })
        )
    }
    async byId(id: Uuid): Promise<Product | undefined> {

        const product = products.find(p => p.id === id.value);
        if (!product) return undefined;
        const price = new Divisa(product.price);
        const res = new Product({
            id: new Uuid(product.id),
            description: product.description,
            price
        })
        return Promise.resolve(res);
    }
    async byIds(ids: Uuid[]): Promise<Product[]> {
        const productsFind: Product[] = [];
        ids.forEach(id => {
            const product = products.find(p => p.id === id.value);
            if(product){
                const price = new Divisa(product.price);
                productsFind.push(new Product({
                    id: new Uuid(product.id),
                    description: product.description,
                    price
                }))
            }
        })
        return Promise.resolve(productsFind);
    }

}


const productFindDummy = new ProductFindDummy()
export { productFindDummy }