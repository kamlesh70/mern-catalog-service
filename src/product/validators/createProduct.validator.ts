import Joi from "joi";
import { PriceTypeEnum } from "../../category/category.type";
import { NextFunction, Request, Response } from "express";

const priceConfigurationProductJoiSchema = Joi.object({
  priceType: Joi.string()
    .valid(PriceTypeEnum.base, PriceTypeEnum.additional)
    .required(),
  availableOptions: Joi.object().pattern(Joi.string(), Joi.number()).required(),
});

const attributesProductJoiSchema = Joi.object({
  name: Joi.string().required(),
  value: Joi.any().required(),
});

const productValidationSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  image: Joi.string().required(),
  priceConfigurations: Joi.object()
    .pattern(Joi.string(), priceConfigurationProductJoiSchema)
    .required(),
  attributes: Joi.array().items(attributesProductJoiSchema).required(),
  tenantId: Joi.string().required(),
  categoryId: Joi.string().required(),
});

export default async function createProductValidator(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  try {
    await productValidationSchema.validateAsync(req.body, { abortEarly: true });
    next();
  } catch (error) {
    next(error);
  }
}
