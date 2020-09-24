import axios from 'axios';
import { Product } from '../models/Product';
import {ConfigHelper} from "@utils/ConfigUtils";
import {ObjectMapper} from "@utils/ObjectMapper";

const ENDPOINTS = {
  search: (): string => '/search',
};

class ProductRepository {
  private axiosInstance = axios.create({
    baseURL: ConfigHelper.getBaseUrl(),
  });


  public getSearch = async (params: ISearchParams): Promise<Product[]> => {
    const { searchString } = params;
    const response = await this.axiosInstance.get(ENDPOINTS.search(), {
      params: {
        term: searchString,
        country: 'in'
      },
    });
    return ObjectMapper.deserializeArray(Product, response.data.results);
  };
}

const productRepository = new ProductRepository();
export { productRepository as ProductRepository };
