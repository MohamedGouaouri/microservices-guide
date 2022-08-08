const amqp = require("amqplib")




async function publish(msg, queue) {
    try {

        const connection = await amqp.connect("amqp://localhost:5672");
        const channel = await connection.createChannel();
        const queue = await channel.assertQueue(queue);

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

export {
    publish
}