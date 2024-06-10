import express, { NextFunction, Request, Response } from "express";
import { CategoryController } from "./category.controller";
import createCategoryValidator from "./validators/createCategory.validator";
import { CategoryService } from "./category.service";
import logger from "../config/logger";
import authenticate from "../middleware/authenticate";
import { canAccess } from "../middleware/canAccess";
import { Roles } from "../constants";

const router = express.Router();

// instances
const categoryService = new CategoryService();
const categoryController = new CategoryController(categoryService, logger);

// api routes
router.post(
  "/create",
  authenticate,
  canAccess([Roles.ADMIN, Roles.MANAGER]),
  createCategoryValidator,
  (req: Request, res: Response, next: NextFunction) => {
    return categoryController.create(req, res, next);
  },
);

router.get(
  "/list",
  authenticate,
  canAccess([Roles.ADMIN, Roles.MANAGER]),
  (req: Request, res: Response, next: NextFunction) => {
    return categoryController.getAllCategory(req, res, next);
  },
);
export default router;
