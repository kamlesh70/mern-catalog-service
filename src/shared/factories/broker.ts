import config from "config";
import { KafkaBroker } from "../../config/kafka";
import { BrokerProducerInterface } from "../../types/brokerProducer";

let producer: BrokerProducerInterface | null = null;

export function brokerInstance() {
  if (!producer) {
    const clientId: string = config.get("broker.clientId");
    const brokers: string[] = config.get("broker.brokers");
    const kafka = new KafkaBroker(clientId, brokers);
    producer = kafka;
  }
  return producer;
}
