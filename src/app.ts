import express, { Request, Response } from "express";
import globalErrorHandler from "./middleware/globalErrorHandler";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import categoryRouter from "./category/category.router";

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(cookieParser());

app.get("/", async (_: Request, res: Response) => {
  return res.status(200).send("Welcome to Auth service");
});

// api router
app.use("/category", categoryRouter);

app.use(globalErrorHandler);

export default app;
