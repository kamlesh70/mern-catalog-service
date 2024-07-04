import { NextFunction, Request, Response } from "express";
import { ProductService } from "./product.service";
import { Logger } from "winston";
import { IProduct } from "./product.type";
import createHttpError from "http-errors";
import { v4 as uuidv4 } from "uuid";

import { fileStorage } from "../types";
import { UploadedFile } from "express-fileupload";
import { CompleteMultipartUploadCommandOutput } from "@aws-sdk/client-s3";
import { getOrder } from "../constants";
import { SortOrder } from "mongoose";
import { BrokerProducerInterface } from "../types/brokerProducer";
import config from "config";

export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly logger: Logger,
    private readonly storageService: fileStorage,
    private readonly broker: BrokerProducerInterface,
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
      const topic: string = config.get("broker.topic.product");
      console.log(product, "==================================");
      void this.broker.sendMessage(
        topic,
        JSON.stringify(
          {
            id: product.id,
            priceConfigurations: product.priceConfigurations,
          },
          null,
          4,
        ),
      );
      res.status(201).json({ id: product?.id });
    } catch (error) {
      next(error);
    }
  }

  async getProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const pagination: any = req.query;
      const page: number = +(pagination?.page ?? 1);
      const limit: number = +(pagination?.limit ?? 5);
      const order: SortOrder = getOrder(pagination?.order as string);
      const orderBy: string = pagination?.orderBy ?? "createdAt";
      const products = await this.productService.getProducts(
        page,
        limit,
        orderBy,
        order,
      );
      res.status(200).json({
        ...products,
        page,
        limit,
      });
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
