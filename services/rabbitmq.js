const amqp = require('amqplib');

const AMQP_URL = process.env.AMQP_URL;
const OCR_TABLE = process.env.DYNAMODB_OCR_IMAGES_TABLE;

const { getInstance } = require('./axiosRequest');
const { queryByUuid } = require('../database/repository/files');
const { update, getItem } = require('../database/config');

const options = { noAck: false, consumerTag: 'file_processor' };

const consume = async (queue, messageLimit) => {
  try {
    const connection = await amqp.connect(AMQP_URL, 'heartbeat=60');
    const channel = await connection.createChannel();

    process.once('SIGINT', async () => {
      await channel.close();
      await connection.close();
      process.exit(0);
    });

    await channel.assertQueue(queue, { durable: true });
    await channel.prefetch(messageLimit);
    await channel.consume(
      queue,
      async message => {
        if (!message) {
          throw new Error('No messages to consume');
        }
        const messageToString = message.content.toString();
        const parsedMessage = JSON.parse(messageToString);
        console.log('parsedMessage');
        console.log(parsedMessage);

        const { uuid } = parsedMessage;

        const query = queryByUuid(OCR_TABLE, uuid);
        const queryResult = await getItem(query);
        const Item = queryResult.Items[0];

        if (!Item) return;

        const status = 'PROCESSED';

        const params = {
          TableName: OCR_TABLE,
          Key: {
            uuid: key,
          },
          UpdateExpression: 'set #oldStatus = :newStatus',
          ExpressionAttributeNames: {
            '#oldStatus': 'status',
          },
          ExpressionAttributeValues: {
            ':newStatus': status,
          },
        };

        await update(params);

        channel.ack(message);

        if (--messageLimit === 0) {
          console.log('Message limit reached');
          await channel.close();
          await connection.close();
        }
      },
      options
    );
  } catch (e) {
    console.log('Error');
    console.error(e);
    await channel.close();
    await connection.close();
  }
};

module.exports = { consume };
