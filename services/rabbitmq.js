const amqplib = require('amqplib');
const AMQP_URL = process.env.AMQP_URL;
const consume = async ({ queue }) => {
  let isPublished = true;

  const connection = await amqplib.connect(AMQP_URL, 'heartbeat=60');
  const channel = await connection.createChannel();
  try {
    await channel.consume(queue, (message) => {
      console.log(message.content.toString());
    })

  } catch (error) {
    console.error('Error in consuming message', error);
  } finally {
    await channel.close();
    await connection.close();
  }

  return isPublished;
};

module.exports = consume;
