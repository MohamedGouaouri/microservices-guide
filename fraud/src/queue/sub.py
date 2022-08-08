import pika


def callback(ch, method, properties, body):
    print(" [x] Received %r" % body)


def consume(queue):
    connection = pika.BlockingConnection(
        pika.ConnectionParameters("localhost"))
    channel = connection.channel()

    channel.queue_declare(queue=queue)

    channel.basic_consume(queue=queue,
                          auto_ack=True,
                          on_message_callback=callback)

    print(' [*] Waiting for messages. To exit press CTRL+C')

    channel.start_consuming()


try:
    consume('test')
except KeyboardInterrupt:
    print("Interrupted")
