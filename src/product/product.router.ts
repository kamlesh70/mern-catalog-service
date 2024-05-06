import express, { NextFunction, Request, Response } from "express";
import authenticate from "../middleware/authenticate";
import { canAccess } from "../middleware/canAccess";
import { Roles } from "../constants";
import { ProductService } from "./product.service";
import { ProductController } from "./product.controller";
import logger from "../config/logger";
import createProductValidator from "./validators/createProduct.validator";
import fileUpload from "express-fileupload";
import createHttpError from "http-errors";

const router = express.Router();

const productService = new ProductService();
const productController = new ProductController(productService, logger);

router.post(
  "/create",
  authenticate,
  canAccess([Roles.ADMIN, Roles.MANAGER]),
  fileUpload({
    limits: { fileSize: 500 * 1024 }, // 500kb
    abortOnLimit: true,
    limitHandler: (_req, _res, next) => {
      const error = createHttpError(400, "File size exceeds the limit");
      next(error);
    },
  }),
  createProductValidator,
  (req: Request, res: Response, next: NextFunction) => {
    return productController.create(req, res, next);
  },
);

export default router;
