import mongoose from "mongoose";
import { PriceTypeEnum } from "../category/category.type";

const priceConfigurationSchema = new mongoose.Schema({
  priceType: {
    type: String,
    required: true,
    enum: PriceTypeEnum,
  },
  availableOptions: {
    type: Map,
    of: Number,
    required: true,
  },
});

const attributesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  value: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
});

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },

    description: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    priceConfigurations: {
      type: Map,
      of: priceConfigurationSchema,
      required: true,
    },

    attributes: [attributesSchema],

    tenantId: {
      type: String,
      required: true,
    },

    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    isPublish: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true },
);

const productModel = mongoose.model("Product", productSchema);

export default productModel;
