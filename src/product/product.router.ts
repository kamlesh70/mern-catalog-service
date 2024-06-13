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
import { S3Storage } from "../shared/fileStorage/S3Storage";

const router = express.Router();

const productService = new ProductService();
const s3Storage = new S3Storage();
const productController = new ProductController(
  productService,
  logger,
  s3Storage,
);

router.get(
  "/list",
  // authenticate,
  // canAccess([Roles.ADMIN, Roles.MANAGER]),
  (req: Request, res: Response, next: NextFunction) => {
    return productController.getProducts(req, res, next);
  },
);

router.post(
  "/create",
  authenticate,
  canAccess([Roles.ADMIN, Roles.MANAGER]),
  createProductValidator,
  (req: Request, res: Response, next: NextFunction) => {
    return productController.create(req, res, next);
  },
);

router.post(
  "/file-upload",
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
  (req: Request, res: Response, next: NextFunction) => {
    return productController.fileUpload(req, res, next);
  },
);

export default router;
