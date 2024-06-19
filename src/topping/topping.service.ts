import { Topping } from "./topping-types";
import toppingModel from "./topping.model";

export class ToppingService {
  async create(topping: Topping) {
    return await toppingModel.create(topping);
  }

  async getAll(tenantId: string) {
    // todo: !Important, add pagination
    return await toppingModel.find({ tenantId });
  }

  async getByName(name: string) {
    return await toppingModel.findOne({ name });
  }
}
