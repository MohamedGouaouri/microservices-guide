const amqp = require("amqplib")




async function publish(msg) {
    try {

        const connection = await amqp.connect("amqp://172.20.0.2:5672");
        const channel = await connection.createChannel();
        const queue = await channel.assertQueue("notifications");

        channel.sendToQueue(
            queue,
            Buffer.from(
                JSON.stringify(msg)
            )
        );

        // await connection.close()

        console.log(`Message sent ${JSON.stringify(msg)}`)

    } catch (err) {
        console.error(err)
    }
}

module.exports = {
    publish
}