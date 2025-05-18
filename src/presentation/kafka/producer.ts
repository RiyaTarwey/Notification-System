import { Partitioners } from "kafkajs";
import { kafka } from "./index"
import { JobQueueRequest } from "../interfaces/request/JobQueueRequest";

export const initProducer = async (body: JobQueueRequest, topic: string , partition? : number) => {
    try {
        const producer = kafka.producer(
            {
                createPartitioner : Partitioners.LegacyPartitioner,
            }
        );
        await producer.connect();
        console.log('Connected to Kafka');
        body.topic = topic 
        let sendFrProdu = await producer.send({
            topic: topic,
            messages: [
                {
                    partition: partition,
                    key: body?.name || topic,
                    value: JSON.stringify(body)
                }
            ]
        });

        console.log('Message sent successfully:', sendFrProdu);
        await producer.disconnect();
        return true;
    } catch (error) {
        console.log("Error on producer", error);
        return false;
    }
}
