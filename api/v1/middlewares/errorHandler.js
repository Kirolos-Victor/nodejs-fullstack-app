const { handleError } = require('../helpers/JsonResponse')
const errorHandler = (err, req, res, next) => {
  // Log the error for debugging
  console.error('Error:', err)
  handleError(res, 500, 'Something went wrong on the server!');
};

module.exports = errorHandler;