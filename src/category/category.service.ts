import { ICategory } from "./category.type";
import Category from "./category.model";

export class CategoryService {
  async create(category: ICategory) {
    return await Category.create(category);
  }

  async isDuplicateCategory(category: ICategory) {
    const duplicate = await Category.findOne({ name: category.name });
    if (duplicate) {
      return true;
    }
    return false;
  }
}
