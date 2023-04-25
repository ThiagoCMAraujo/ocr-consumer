const {normalizeEvent} = require('../services/eventNormalizer');
const {response} = require('../services/responseFormatter');

const handle = async event => {

    const normalizedEvent = normalizeEvent(event);
    console.log(normalizedEvent);

    const {fileKey} = normalizedEvent.data;

    const result = "dsadsadsadasdjskaldlsandlkasnldasnkldnklasknkdasnldnasfbewdsjanduie";

    return response(200, {
        result
    });
}

module.exports = handle;