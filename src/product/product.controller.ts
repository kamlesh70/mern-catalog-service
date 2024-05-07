import { NextFunction, Request, Response } from "express";
import { ProductService } from "./product.service";
import { Logger } from "winston";
import { IProduct } from "./product.type";
import createHttpError from "http-errors";
import { v4 as uuidv4 } from "uuid";

import { fileStorage } from "../types";
import { UploadedFile } from "express-fileupload";
import { CompleteMultipartUploadCommandOutput } from "@aws-sdk/client-s3";

export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly logger: Logger,
    private readonly storageService: fileStorage,
  ) {}

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body as IProduct;
      if (await this.productService.isDuplicateProduct(body.name)) {
        const error = createHttpError(
          400,
          "Duplicate product name is not allowed",
        );
        throw error;
      }
      const product = await this.productService.create(body);
      this.logger.info(`Product created`, product);
      res.status(201).json({ id: product?.id });
    } catch (error) {
      next(error);
    }
  }

  async fileUpload(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.files || !req?.files?.product) {
        const error = createHttpError(400, "No file uploaded");
        throw error;
      }
      const file = (req.files.product as UploadedFile).data;
      const fileName = "product_" + uuidv4();
      const response: CompleteMultipartUploadCommandOutput =
        await this.storageService.uploadFile({
          fileName: fileName,
          fileData: file,
        });
      res.status(200).send({ message: "success", url: response?.Location });
    } catch (error) {
      next(error);
    }
  }
}
