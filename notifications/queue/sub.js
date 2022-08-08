const amqp = require("amqplib")


async function connect() {
    let channel
    try {

        const connection = await amqp.connect("amqp://localhost:5672");
        channel = await connection.createChannel();
    } catch (err) {
        console.error(err)
    }
    finally {
        return channel
    }
}

async function consume(channel, queue) {
    try {
        await channel.assertQueue(queue);
        channel.consume(q, msg => {
            console.log(`Sending notification: ${msg.content.toString()}`)
            channel.ack(msg)
        })

    } catch (e) {

    }
}



module.exports = {
    connect, consume
}