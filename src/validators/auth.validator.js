const { body, validationResult } = require('express-validator');

const loginValidator = [
  body('idToken')
    .notEmpty()
    .withMessage('Firebase ID token is required')
    .isString()
    .withMessage('ID token must be a string'),
];

const updateProfileValidator = [
  body('name')
    .optional()
    .isString()
    .withMessage('Name must be a string')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  
  body('avatar')
    .optional()
    .isURL()
    .withMessage('Avatar must be a valid URL'),
  
  body('notifications')
    .optional()
    .isBoolean()
    .withMessage('Notifications must be a boolean'),
  
  body('language')
    .optional()
    .isIn(['id', 'en'])
    .withMessage('Language must be either "id" or "en"'),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: errors.array(),
    });
  }
  next();
};

module.exports = {
  loginValidator,
  updateProfileValidator,
  validate,
};