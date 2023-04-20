const axios = require('axios').default;

const getInstance = (baseURL, timeout = 10000) => {
  return axios.create({
    baseURL,
    timeout,
  });
};

module.exports = { getInstance };
