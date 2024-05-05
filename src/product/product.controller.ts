import { NextFunction, Request, Response } from "express";
import { ProductService } from "./product.service";
import { Logger } from "winston";
import { IProduct } from "./product.type";

export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly logger: Logger,
  ) {}

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await this.productService.create(req.body as IProduct);
      this.logger.info(`Product created`, product);
      res.status(201).json({ id: product?.id });
    } catch (error) {
      next(error);
    }
  }
}
