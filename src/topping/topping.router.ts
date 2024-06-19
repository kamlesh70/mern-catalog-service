import express, { NextFunction, Request, Response } from "express";
import fileUpload from "express-fileupload";
import createHttpError from "http-errors";
import { ToppingService } from "./topping.service";
import { ToppingController } from "./topping.controller";
import authenticate from "../middleware/authenticate";
import { canAccess } from "../middleware/canAccess";
import { Roles } from "../constants";
import createToppingValidator from "./validators/createToppingValidator";
import { S3Storage } from "../shared/fileStorage/S3Storage";

const router = express.Router();

const toppingService = new ToppingService();

const toppingController = new ToppingController(
  new S3Storage(),
  toppingService,
);

router.post(
  "/",
  authenticate,
  canAccess([Roles.ADMIN, Roles.MANAGER]),
  fileUpload({
    limits: { fileSize: 1024 * 1024 }, // 1mb
    abortOnLimit: true,
    limitHandler: (req, res, next) => {
      const error = createHttpError(400, "File size exceeds the limit");
      next(error);
    },
  }),
  createToppingValidator,
  (req: Request, res: Response, next: NextFunction) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return toppingController.create(req, res, next);
  },
);

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  return toppingController.get(req, res, next);
});

export default router;
