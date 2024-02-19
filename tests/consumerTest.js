const kafka = require('./kafkaLib/kafkaConfig');

// remember to connect and disconnect when you are done

(async function main() {
    // Consume messages
    const consumer = kafka.consumer({ groupId: 'mygroup1' });
    await consumer.connect();
    await consumer.subscribe({ topic: 'mytopic' });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log('here >>>>>>>', { message });
        },
    });
})();