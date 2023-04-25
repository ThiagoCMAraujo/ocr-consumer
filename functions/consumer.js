const {
  response,
  errorResponseFormat,
} = require('../services/responseFormatter');

const { getInstance } = require('../services/axiosRequest');
const { queryByUuid } = require('../database/repository/files');
const { update, getItem } = require('../database/config');

const { consume } = require('../services/rabbitmq');

const handle = async _ => {
  try {
    const processor = async messages => {

      const parsedMessage = JSON.parse(messageToString);
      messages.push(parsedMessage);
      console.log('messages');
      console.log(messages);
      const { key } = parsedMessage;

      const query = queryByUuid(OCR_TABLE, key);
      const queryResult = await getItem(query);
      const Item = queryResult.Items[0];
      let { files } = Item;

      for (const m of messages) {
        for (const file of files) {
          if (file.fileKey == m.fileKey) {
            console.log(file.fileKey, m.fileKey);
            file.status = 'PROCESSED';
          }
        }
      }

      console.log('files');
      console.log(files);

      const params = {
        TableName: OCR_TABLE,
        Key: {
          uuid: key,
        },
        UpdateExpression: 'set #oldFiles = :newFiles',
        ExpressionAttributeNames: {
          '#oldFiles': 'files',
        },
        ExpressionAttributeValues: {
          ':newFiles': files,
        },
      };

      await update(params);
    };

    await consume('images.to_render', 2);
    console.log('ended consuming');

    return response(200, {
      message: 'Ok',
    });
  } catch (e) {
    return errorResponseFormat(e);
  }
};

module.exports = handle;
