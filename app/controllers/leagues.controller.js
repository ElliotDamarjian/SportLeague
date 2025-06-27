const League = require("../models/leagues.model.js");
const { body } = require('express-validator');
const { handleValidationErrors, handleResponse, handleError } = require("./controller.util.js");

exports.validate = (method) => {
  let rules = [
    body('name').not().isEmpty().trim().escape(),
    body('description').not().isEmpty().trim().escape()
  ];

  if (method === 'createLeague') {
    rules.push(body('name').custom(async (value) => {
      return await League.checkDuplicateName(value);
    }));
  }

  return rules;
};

exports.create = async (req, res) => {
  const validationError = handleValidationErrors(req, res);
  if (validationError) return;

  try {
    const result = await League.create(req.body);
    handleResponse(res, result, "League created successfully.");
  } catch (err) {
    handleError(res, err);
  }
};

exports.findAll = async (req, res) => {
  try {
    const { sortCol, sortDir, limit, offset, filterCol, filterStr } = req.query;
    const result = await League.getAll(sortCol, sortDir, limit, offset, filterCol, filterStr);
    handleResponse(res, result);
  } catch (err) {
    handleError(res, err);
  }
};

exports.findOne = async (req, res) => {
  try {
    const result = await League.findById(req.params.id);
    handleResponse(res, result);
  } catch (err) {
    handleError(res, err);
  }
};

exports.update = async (req, res) => {
  const validationError = handleValidationErrors(req, res);
  if (validationError) return;

  try {
    const result = await League.updateById(req.params.id, req.body);
    handleResponse(res, result, "League updated.");
  } catch (err) {
    handleError(res, err);
  }
};

exports.delete = async (req, res) => {
  try {
    const result = await League.remove(req.params.id);
    handleResponse(res, result, "League deleted.");
  } catch (err) {
    handleError(res, err);
  }
};
