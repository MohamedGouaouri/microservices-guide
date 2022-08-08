import pika


def publish(data, queue="jobs"):
    connection = pika.BlockingConnection(
        pika.ConnectionParameters("localhost"))
    channel = connection.channel()
    channel.queue_declare(queue=queue)
    channel.basic_publish(exchange="",
                          routing_key=queue,
                          body=data
                          )

    print(" [x] Data sent ")

    connection.close()


publish("hello from fraud", 'test')
