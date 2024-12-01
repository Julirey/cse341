const { body, validationResult } = require("express-validator");

/* *********************************
 *  Contacts Validation Rules
 * ********************************* */
const contactRules = () => {
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
    body("favoriteColor")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 1 })
        .isAlphanumeric(),
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

module.exports = { contactRules, validate };
