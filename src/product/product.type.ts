import { PriceTypeEnum } from "../category/category.type";

export interface IProductPriceConfigurations {
  [key: string]: {
    priceType: PriceTypeEnum.base | PriceTypeEnum.additional;
    availableOptions: {
      [key: string]: number;
    };
  };
}

export interface IProductAttributes {
  name: string;
  value: any;
}

export interface IProduct {
  name: string;
  description: string;
  image: string;
  priceConfigurations: IProductPriceConfigurations;
  attributes: [IProductAttributes];
  tenantId: string;
  categoryId: string;
}
