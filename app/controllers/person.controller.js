const Person = require("../models/person.model.js");
const { body } = require('express-validator');
const { handleValidationErrors, handleResponse, handleError } = require("./controller.util.js");

exports.validate = (method) => {
  let rules = [
    body('first_name').not().isEmpty().trim().escape(),
    body('last_name').not().isEmpty().trim().escape(),
    body('address1').not().isEmpty().trim().escape(),
    body('address2').optional().trim().escape(),
    body('city').not().isEmpty().trim().escape(),
    //need state to be 2 letter ids
    body('state').isLength({ min: 2, max: 2 }).trim().escape(),
    body('zip').isLength({ min: 5, max: 5 }).isNumeric().trim().escape(),
    body('email').isEmail().normalizeEmail(),
    body('phone').trim().escape(),
    body('team_id').isInt(),
    body('user_name').isLength({ min: 6 }).trim().escape(),
    body('logo_path').optional().trim().escape(),
    body('person_type').isIn(['coach', 'player', 'admin'])
  ];

  if (method === 'createPerson') {
    rules.push(body('email').custom(async (value) => {
      return await Person.checkDuplicateEmail(value);
    }));
  }

  return rules;
};

exports.create = async (req, res) => {
  const validationError = handleValidationErrors(req, res);
  if (validationError) return;

  try {
    const result = await Person.create(req.body);
    handleResponse(res, result, "Person created successfully.");
  } catch (err) {
    handleError(res, err);
  }
};

exports.findAll = async (req, res) => {
  try {
    const { sortCol, sortDir, limit, offset, filterCol, filterStr, person_type } = req.query;
    const result = await Person.getAll(sortCol, sortDir, limit, offset, filterCol, filterStr, person_type);
    handleResponse(res, result);
  } catch (err) {
    handleError(res, err);
  }
};;

exports.findOne = async (req, res) => {
  try {
    const result = await Person.findById(req.params.id);
    handleResponse(res, result);
  } catch (err) {
    handleError(res, err);
  }
};

exports.update = async (req, res) => {
  const validationError = handleValidationErrors(req, res);
  if (validationError) return;

  try {
    const result = await Person.updateById(req.params.id, req.body);
    handleResponse(res, result, "Person updated.");
  } catch (err) {
    handleError(res, err);
  }
};

exports.delete = async (req, res) => {
  try {
    const result = await Person.remove(req.params.id);
    handleResponse(res, result, "Person deleted.");
  } catch (err) {
    handleError(res, err);
  }
};