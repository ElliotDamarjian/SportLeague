const { validationResult } = require('express-validator');

exports.handleValidationErrors = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  return null;
};

exports.handleResponse = (res, data, message = "") => {
  res.send({
    message: message,
    data: data
  });
};

exports.handleError = (res, err) => {
  res.status(500).send({
    message: err.message || "An error occurred."
  });
};