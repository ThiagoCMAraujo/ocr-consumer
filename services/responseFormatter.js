const response = (statusCode, body) => {
  return {
    statusCode,
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  };
};

const errorResponseFormat = (error = null) => {
  console.error(error);

  if (error.statusCode) {
    return response(error.statusCode, { message: error.message });
  }

  return response(500, { message: 'Aconteceu um erro inesperado' });
};

module.exports = { response, errorResponseFormat };
