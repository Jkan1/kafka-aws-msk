const kafka = require('./kafkaLib/kafkaConfig');

// remember to connect and disconnect when you are done

(async function main() {
    const producer = kafka.producer();
    await producer.connect();
    await producer.send({
        topic: 'mytopic',
        acks: 1,
        messages: [{ value: 'Hello, Kafka!' }],
    });
    await producer.disconnect();
})();