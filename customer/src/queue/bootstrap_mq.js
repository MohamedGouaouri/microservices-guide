const amqp = require("amqplib")


let connectionMQ
async function mqConnect() {
    try {

        const connection = await amqp.connect("amqp://172.20.0.2:5672");
        const channel = await connection.createChannel();
        connectionMQ = {
            connection,
            channel
        }


    } catch (err) {
        console.error(err)
    }
}

mqConnect()

async function publish(msg, queue) {
    try {
        if (!connectionMQ) {
            throw Error("MQ connection is not setup")

        }

        const { channel } = connectionMQ;
        channel.sendToQueue(queue, msg)

    } catch (e) {
        console.error(e)
    }
}
async function mqDisconnect() {
    try {
        if (!connectionMQ) {
            throw Error("MQ connection is not setup")

        }

        const { connection } = connectionMQ;

        connection.close()

    } catch (e) {
        console.error(e)
    }
}
module.exports = {
    mqConnect, publish, mqDisconnect
}