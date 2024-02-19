const kafka = require('./kafkaConfig');

const producer = kafka.producer();

producer.connect()
    .then(() => {
        console.log('Producer is running...');
    })
    .catch((error) => {
        console.error('Failed to run kafka Producer', error);
    });

async function disconnect() {
    await producer.disconnect();
};

const sendNotification = async (topic, payload) => {
    const message = JSON.stringify(payload);
    await producer.send({
        topic,
        messages: [{ value: message }],
    });
    console.log(`Message sent to ${topic}: ${message}`);
};

module.exports = {
    disconnect,
    sendNotification
};