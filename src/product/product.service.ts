import Product from "./product.model";
import { IProduct } from "./product.type";

export class ProductService {
  async create(product: IProduct) {
    return await Product.create(product);
  }
}
