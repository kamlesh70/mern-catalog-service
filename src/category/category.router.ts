import express, { NextFunction, Request, Response} from "express"
import { CategoryController } from "./category.controller";
import createCategoryValidator from "./validators/createCategory.validator";
import { CategoryService } from "./category.service";
import logger from "../config/logger";

const router = express.Router();

// instances
const categoryService = new CategoryService();
const categoryController = new CategoryController(categoryService, logger);


// api routes
router.post('/create', createCategoryValidator, 
  (req: Request, res: Response, next: NextFunction) => {
    return categoryController.create(req, res, next);
  }
);


export default router;