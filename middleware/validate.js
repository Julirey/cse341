const { body, validationResult } = require("express-validator");

/* *********************************
 *  Music Validation Rules
 * ********************************* */
const musicRules = () => {
  return [
    body("firstName")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 1 })
        .isAlphanumeric("en-US", { ignore: " äüïöë"}),
    body("lastName")
        .trim()
        .escape()   
        .notEmpty()
        .isLength({ min: 1 })
        .isAlphanumeric("en-US", { ignore: " äüïöë"}),
    body("workTitle")
        .trim()
        .escape()   
        .notEmpty()
        .isLength({ min: 1 })
        .isAlphanumeric("en-US", { ignore: " äüïöë"}),
    body("key")
        .trim()
        .escape()   
        .notEmpty()
        .isLength({ min: 1 })
        .isAlphanumeric("en-US", { ignore: " -"}),
    body("year")
        .trim()
        .escape()   
        .notEmpty()
        .isLength({ min: 1, max: 4 })
        .isAlphanumeric(),
    body("averageDuration")
        .trim()
        .escape()   
        .notEmpty()
        .isLength({ min: 1 })
        .isAlphanumeric("en-US", { ignore: " -"}),
    body("instrumentation")
        .trim()
        .escape()   
        .notEmpty()
        .isLength({ min: 1 })
        .isAlphanumeric("en-US", { ignore: " ,"}),
  ];
};

/* *********************************
 *  Users Validation Rules
 * ********************************* */
const usersRules = () => {
  return [
    body("firstName")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 1 })
        .isAlphanumeric(),
    body("lastName")
        .trim()
        .escape()   
        .notEmpty()
        .isLength({ min: 1 })
        .isAlphanumeric(),
    body("email")
        .trim()
        .escape()   
        .notEmpty()
        .isEmail()
        .normalizeEmail(),
    body("birthday")
        .trim()
        .escape()
        .notEmpty()
        .isISO8601(),
  ];
};

/* *********************************
 *  Validate function
 * ********************************* */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.path]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = { musicRules, usersRules, validate };
