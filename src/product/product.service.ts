import productModel from "./product.model";
import { IProduct } from "./product.type";

export class ProductService {
  async create(product: IProduct) {
    return await productModel.create(product);
  }

  async isDuplicateProduct(name: string) {
    const product = await productModel.findOne({ name });
    return !!product;
  }
}
