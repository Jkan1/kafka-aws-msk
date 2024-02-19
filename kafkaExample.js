const kafka = require('./kafkaLib/kafkaConfig');

// remember to connect and disconnect when you are done

(async function main() {
    // Create Topic
    const admin = kafka.admin();
    await admin.connect();
    await admin.createTopics({
        topics: [{
            topic: 'mytopic', numPartitions: 1, replicationFactor: 1, replicaAssignment: [{
                partition: 1,
                replicas: [1]
            }]
        }]
    });

    // Consume messages
    const consumer = kafka.consumer({ groupId: 'mygroup1' });
    await consumer.connect();
    await consumer.subscribe({ topic: 'mytopic' });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log('here >>>>>>>', {
                key: message.key.toString(),
                value: message.value.toString(),
                headers: message.headers,
            });
        },
    });

    // Produce a message
    const producer = kafka.producer();
    await producer.connect();
    await producer.send({
        topic: 'mytopic',
        acks: 1,
        messages: [{ value: 'Hello, Kafka!' }],
    });
    await producer.disconnect();

})();