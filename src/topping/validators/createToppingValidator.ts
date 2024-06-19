import Joi from "joi";
import { NextFunction, Request, Response } from "express";

const productValidationSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required().min(0),
  tenantId: Joi.string().required(),
  image: Joi.object({
    name: Joi.string().required(),
    data: Joi.binary().required(),
    size: Joi.number().required(),
    encoding: Joi.string().required(),
    mimetype: Joi.string().required(),
  }).required(),
});

export default async function createToppingValidator(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  try {
    await productValidationSchema.validateAsync(
      { ...req.body, ...req.files },
      { abortEarly: true, allowUnknown: true },
    );
    next();
  } catch (error) {
    next(error);
  }
}
