const amqp = require('amqplib/callback_api');
const eventHandler = require('./event_handler')

const CONN_URL = 'amqp://RABBITMQ_HOST:5672'
const QUEUE = 'notes'

amqp.connect(CONN_URL, function (err, conn) {
    conn.createChannel(function (err, ch) {
        ch.assertQueue(QUEUE, { durable: false });
        ch.prefetch(1);
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", QUEUE);
        ch.consume(QUEUE, function (msg) {
            console.log(" [x] Received %s", msg.content.toString());
            
            const notesMessage = JSON.parse(msg.content)

            console.log(notesMessage)
            
            if(notesMessage.owner && notesMessage.notes) {
                eventHandler.eventHandle(notesMessage)
            }
        }, { noAck: true });
    });
});