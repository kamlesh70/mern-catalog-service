import mongoose from "mongoose";
import {
  IAttribute,
  IPriceConfiguration,
  PriceTypeEnum,
  WidgetTypeEnum,
} from "./category.type";

const priceConfigurationSchema = new mongoose.Schema<IPriceConfiguration>({
  priceType: {
    type: String,
    required: true,
    enum: PriceTypeEnum,
  },
  availableOptions: {
    type: [String],
    required: true,
  },
});

const attributesSchema = new mongoose.Schema<IAttribute>({
  name: {
    type: String,
    required: true,
  },
  widgetType: {
    type: String,
    required: true,
    enum: WidgetTypeEnum,
  },
  defaultValue: {
    type: String,
    required: true,
  },
  availableOptions: {
    type: [String],
    required: true,
  },
});

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    priceConfigurations: {
      type: Map,
      of: priceConfigurationSchema,
      required: true,
    },
    attributes: {
      type: [attributesSchema],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const categoryModel = mongoose.model("Category", categorySchema);

export default categoryModel;
