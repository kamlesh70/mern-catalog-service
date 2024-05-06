import { ICategory } from "./category.type";
import categoryModel from "./category.model";

export class CategoryService {
  async create(category: ICategory) {
    return await categoryModel.create(category);
  }

  async isDuplicateCategory(category: ICategory) {
    const duplicate = await categoryModel.findOne({ name: category.name });
    if (duplicate) {
      return true;
    }
    return false;
  }
}
