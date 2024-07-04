import { Kafka, Producer } from "kafkajs";
import { BrokerProducerInterface } from "../types/brokerProducer";

export class KafkaBroker implements BrokerProducerInterface {
  private producer: Producer;

  constructor(clientId: string, brokers: string[]) {
    const kafka = new Kafka({ clientId, brokers });
    this.producer = kafka.producer();
  }

  async connect() {
    await this.producer.connect();
  }

  async disconnect() {
    await this.producer.disconnect();
  }

  async sendMessage(topic: string, message: string) {
    await this.producer.send({
      topic,
      messages: [{ value: message }],
    });
  }
}
