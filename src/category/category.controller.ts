import { NextFunction, Response, Request } from "express";
import { CategoryService } from "./category.service";
import { Logger } from "winston";
import { ICategory } from "./category.type";
import createHttpError from "http-errors";

export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly logger: Logger,
  ) {}

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      if (
        await this.categoryService.isDuplicateCategory(req.body as ICategory)
      ) {
        const error = createHttpError(
          400,
          "Duplicate category name is not allowed",
        );
        throw error;
      }
      const createCategory = await this.categoryService.create(
        req.body as ICategory,
      );
      this.logger.info(`Category created`, { createCategory });
      res.status(200).json({ id: createCategory?.id });
    } catch (error) {
      next(error);
    }
  }

  async getAllCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await this.categoryService.getAllCategory();
      res.status(200).json({ categories });
    } catch (error) {
      next(error);
    }
  }
}
