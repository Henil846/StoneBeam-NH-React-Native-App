const { validationResult } = require('express-validator');

/**
 * Middleware that checks express-validator results.
 * If there are errors, returns 400 with the first error message.
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    throw new Error(errors.array()[0].msg);
  }
  next();
};

module.exports = validate;
