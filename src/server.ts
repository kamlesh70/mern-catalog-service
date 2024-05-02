import app from "./app";
import config from 'config';
import logger from "./config/logger";

function serverBootstrap() {
  try {
    const PORT: number = config.get('server.PORT') || 5500;
    console.log(PORT);
    app.listen(PORT, () => {
      logger.info(`Listening on port number ${PORT}`);
    });
  } catch (error) {
    console.log("getting error while starting server");
    process.exit(1);
  }
}

serverBootstrap();
