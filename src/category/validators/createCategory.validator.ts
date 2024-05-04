
import { NextFunction, Request,  Response} from 'express';
import Joi from 'joi';
import { PriceTypeEnum, WidgetTypeEnum } from '../category.type';

const priceConfigurationJoiSchema = Joi.object({
  priceType: Joi.string().valid(PriceTypeEnum.base, PriceTypeEnum.additional).required(),
  defaultValue: Joi.string().required(),
  availableOptions: Joi.array().items(Joi.string()).required()
})

const attributesJoiSchema = Joi.object({
  name: Joi.string().required(),
  widgetType: Joi.string().required().valid(WidgetTypeEnum.radio, WidgetTypeEnum.switch),
  defaultValue: Joi.string().required(),
  availableOptions: Joi.array().items(Joi.string().required()).required()
})

const schema = Joi.object({
  name: Joi.string().required(),
  priceConfiguration: Joi.object().pattern(Joi.string(), priceConfigurationJoiSchema).required(),
  attributes: Joi.array().items(attributesJoiSchema)
})

export default async function createCategoryValidator(req: Request, _res: Response, next: NextFunction){
  try {
    await schema.validateAsync(req.body, { abortEarly: true });
    next();
  } catch (error) {
    next(error);
  }
}

