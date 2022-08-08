const amqp = require("amqplib")


async function consume() {
    try {

        const connection = await amqp.connect("amqp://localhost:5672");
        const channel = await connection.createChannel();
        const queue = await channel.assertQueue("jobs");
        console.log("hello")
        channel.consume("jobs", msg => {
            console.log(msg.content.toString())
            channel.ack(msg)
        })

    } catch (err) {
        console.error(err)
    }
}

consume()
