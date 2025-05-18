import dotenv from "dotenv";
import { Kafka } from "kafkajs";
import { kafkaMaintopics, kafkaMaintopicsNames, queueTypesNames } from "../../utils/constant";  // Import your topics

dotenv.config();

// Initialize Kafka client with new clientId
export const kafka = new Kafka({
    clientId: "notification-system",
    brokers: [process.env.KAFKABASEURL as string]
});

export const init = async () => {
    try {
        const admin = kafka.admin();  // Admin connection to Kafka
        await admin.connect();
        console.log("Kafka admin is connected");

        // Extract topic names from kafkaMaintopics to delete them
        const topicsToDelete = kafkaMaintopics.map(topic => topic.topic);

        // Delete existing topics
        // await admin.deleteTopics({
        //     topics: topicsToDelete,
        // });
        // console.log(`Topics deleted: ${topicsToDelete.join(", ")}`);

        // Recreate the topics
        await admin.createTopics({
            topics: [
                {
                    topic: kafkaMaintopicsNames.promotional,
                    numPartitions: 1
                },
                {
                    topic: kafkaMaintopicsNames.transaction,
                    numPartitions: 4
                },
            ]
        });
        // await admin.createPartitions({
        //     topicPartitions: [
        //         { topic: kafkaMaintopicsNames.transaction, count: 4 },
        //         // { topic: kafkaMaintopicsNames.logPrecessedJobQueue, count: 3 },
        //     ],
        // });
        // const list = await admin.fetchTopicMetadata();
        // console.log("Listed Topic: " + JSON.stringify(list, null, 2));


        console.log("Topics recreated");

        // Disconnect the admin client
        await admin.disconnect();
    } catch (error) {
        console.error("Error during Kafka admin operations:", error);
    }
};
