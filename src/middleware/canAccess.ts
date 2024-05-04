import { Response, NextFunction, Request } from "express";
import { UserFromRequest } from "../types";
import createHttpError from "http-errors";
import { StatusCodes } from "http-status-codes";

export function canAccess(roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const request = req as unknown as UserFromRequest;
    if (roles.includes(request?.auth?.role)) {
      next();
    } else {
      const error = createHttpError(
        StatusCodes.FORBIDDEN,
        "You don't have permission to access this api endpoint",
      );
      next(error);
    }
  };
}
