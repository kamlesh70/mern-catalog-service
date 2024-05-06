import { NextFunction, Request, Response } from "express";
import { ProductService } from "./product.service";
import { Logger } from "winston";
import { IProduct } from "./product.type";
import createHttpError from "http-errors";

export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly logger: Logger,
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
}
