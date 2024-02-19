const kafka = require('./kafkaConfig');

const consumer = kafka.consumer({ groupId: 'notification-group' });

consumer.connect()
    .then(() => {
        console.log('Consumer is running...');
    })
    .catch((error) => {
        console.error('Failed to run kafka Consumer', error);
    });

async function disconnect() {
    await consumer.disconnect();
};

const handleMessage = async ({ topic, partition, message }) => {
    console.log(`Received message from topic '${topic}': ${message.value.toString()}`);

    if (topic === 'email') {
        console.log('Handling email notification:', message.value.toString());
    } else if (topic === 'sms') {
        console.log('Handling SMS notification:', message.value.toString());
    } else {
        console.log('Unknown topic:', topic);
    }

    await consumer.commitOffsets([{ topic, partition, offset: message.offset }]);
};

const subscribeTopic = async (topic, handler) => {
    await consumer.subscribe({ topic: topic });
    console.log('Consumer subscribed to topic:', topic);
    await consumer.run({
        eachMessage: handler || handleMessage,
    });
};

module.exports = {
    disconnect,
    subscribeTopic
};