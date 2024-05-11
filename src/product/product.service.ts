import productModel from "./product.model";
import { IProduct } from "./product.type";

export class ProductService {
  async create(product: IProduct) {
    return await productModel.create(product);
  }

  async getProducts() {
    return await productModel.find().populate({
      path: "categoryId",
      select: "name",
    });
  }

  async isDuplicateProduct(name: string) {
    const product = await productModel.findOne({ name });
    return !!product;
  }
}
