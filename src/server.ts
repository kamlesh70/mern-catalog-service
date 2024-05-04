import app from "./app";
import config from "config";
import logger from "./config/logger";
import connectDatabase from "./db";

async function serverBootstrap() {
  try {
    const PORT: number = config.get("server.PORT") ?? 5500;
    await connectDatabase();
    logger.info(`Connected to database successfully!`);
    app.listen(PORT, () => {
      logger.info(`Listening on port number ${PORT}`);
    });
  } catch (error) {
    logger.info(error);
    process.exit(1);
  }
}

void serverBootstrap();
