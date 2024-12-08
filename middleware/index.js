const Util = {};

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for
 * General Error Handling
 **************************************** */
Util.handleErrors = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// Check Error
Util.isOperationalError = function (error) {
  if (error instanceof BaseError) {
    return error.isOperational;
  }
  return false;
};

module.exports = Util;
