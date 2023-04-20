const {
  response,
  errorResponseFormat,
} = require('../services/responseFormatter');

const { save } = require('../database/config');
const consume = require('../services/rabbitmq');

const tableName = process.env.DYNAMODB_OCR_IMAGES_TABLE;
const handle = async _ => {
  try {
    await consume("images.to_render")

   

    return response(200, {
      Item,
    });
  } catch (e) {
    return errorResponseFormat(e);
  }
};

module.exports = handle;
