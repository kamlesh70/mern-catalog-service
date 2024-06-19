import { NextFunction, Response, Request } from "express";
import { UploadedFile } from "express-fileupload";
import { v4 as uuidv4 } from "uuid";
import { fileStorage } from "../types";
import createHttpError from "http-errors";
import { CreateRequestBody, Topping } from "./topping-types";
import { ToppingService } from "./topping.service";

export class ToppingController {
  constructor(
    private storage: fileStorage,
    private toppingService: ToppingService,
  ) {}

  create = async (
    req: Request<object, object, CreateRequestBody>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const isExists = await this.toppingService.getByName(req.body.name);
      if (isExists) {
        const error = createHttpError(
          400,
          "Duplicate topping name is not allowed",
        );
        throw error;
      }

      const image = req.files!.image as UploadedFile;
      console.log(image);
      const fileUuid = uuidv4();

      // todo: add error handling
      const uploadedFile = await this.storage.uploadFile({
        fileName: fileUuid,
        fileData: image.data,
      });

      // todo: add error handling
      const savedTopping = await this.toppingService.create({
        ...req.body,
        image: uploadedFile?.Location,
        tenantId: req.body.tenantId,
      } as Topping);

      res.json({ id: savedTopping._id });
    } catch (err) {
      return next(err);
    }
  };

  get = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const toppings = await this.toppingService.getAll(
        req.query.tenantId as string,
      );

      // todo: add error handling
      const readyToppings = toppings.map((topping) => {
        return {
          id: topping._id,
          name: topping.name,
          price: topping.price,
          tenantId: topping.tenantId,
          image: topping.image,
        };
      });
      res.json(readyToppings);
    } catch (err) {
      return next(err);
    }
  };
}
