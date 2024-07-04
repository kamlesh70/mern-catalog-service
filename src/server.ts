import app from "./app";
import config from "config";
import logger from "./config/logger";
import connectDatabase from "./config/db";
import { BrokerProducerInterface } from "./types/brokerProducer";
import { brokerInstance } from "./shared/factories/broker";

async function serverBootstrap() {
  let broker: BrokerProducerInterface | null = null;
  try {
    const PORT: number = config.get("server.PORT") ?? 5500;
    await connectDatabase();
    logger.info(`Connected to database successfully!`);
    broker = brokerInstance();
    await broker.connect();
    app.listen(PORT, () => {
      logger.info(`Listening on port number ${PORT}`);
    });
  } catch (error) {
    if (broker) {
      await broker.disconnect();
      logger.info("Broker disconnected");
    }
    logger.info(error);
    process.exit(1);
  }
}

void serverBootstrap();
