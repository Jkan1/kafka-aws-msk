const { Kafka } = require('kafkajs');
const { Type, awsIamAuthenticator, } = require('@jm18457/kafkajs-msk-iam-authentication-mechanism')

const SECRETS = require('./secrets.json');

const provider = awsIamAuthenticator({
    region: 'ap-south-1',
    credentials: {
        accessKeyId: SECRETS.accessKeyId,
        secretAccessKey: SECRETS.secretAccessKey,
    }
})

const kafka = new Kafka({
    clientId: SECRETS.clientName,
    brokers: [SECRETS.brokerUrl1, SECRETS.brokerUrl2],
    ssl: true,
    sasl: {
        mechanism: Type,
        authenticationProvider: provider
    }
});

module.exports = kafka;