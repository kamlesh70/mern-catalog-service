import express, { NextFunction, Request, Response } from "express";
import authenticate from "../middleware/authenticate";
import { canAccess } from "../middleware/canAccess";
import { Roles } from "../constants";
import { ProductService } from "./product.service";
import { ProductController } from "./product.controller";
import logger from "../config/logger";

const router = express.Router();

const productService = new ProductService();
const productController = new ProductController(productService, logger);

router.post(
  "/create",
  authenticate,
  canAccess([Roles.ADMIN, Roles.MANAGER]),
  (req: Request, res: Response, next: NextFunction) => {
    return productController.create(req, res, next);
  },
);

export default router;
