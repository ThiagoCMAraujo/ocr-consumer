const axios = require('axios').default;

const getInstance = (baseURL, timeout = 15000) => {
  return axios.create({
    baseURL,
    timeout,
  });
};

module.exports = { getInstance };
