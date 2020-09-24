import {ProductRepository} from "../domain/repositories/ProductRepository";

class ProductService {
    public getSearch = async (query: string) => {
        const params: ISearchParams = {
            searchString: query,
        }
        return await ProductRepository.getSearch(params);
    }
}

const productService = new ProductService();
export {productService as ProductService}