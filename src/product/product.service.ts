import { SortOrder } from "mongoose";
import productModel from "./product.model";
import { IProduct } from "./product.type";

export class ProductService {
  async create(product: IProduct) {
    return await productModel.create(product);
  }

  async getProducts(
    page: number,
    limit: number,
    orderBy: string,
    order: SortOrder,
    tenantId: string | null,
  ) {
    if (tenantId) {
      const products = await productModel
        .find({ tenantId })
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ [orderBy]: order })
        .populate({
          path: "categoryId",
        });
      const productCount = await productModel.countDocuments({ tenantId });
      return {
        products,
        productCount,
      };
    }
    const products = await productModel
      .find()
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ [orderBy]: order })
      .populate({
        path: "categoryId",
      });

    const productCount = await productModel.countDocuments();
    return {
      products,
      productCount,
    };
  }

  async isDuplicateProduct(name: string) {
    const product = await productModel.findOne({ name });
    return !!product;
  }
}
