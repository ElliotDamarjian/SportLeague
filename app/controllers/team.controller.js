const Team = require("../models/team.model.js");
const { body } = require('express-validator');
const { handleValidationErrors, handleResponse, handleError } = require("./controller.util.js");

exports.validate = (method) => {
  let rules = [
    body('name').not().isEmpty().trim().escape(),
    body('coach_id').isInt(),
    body('league_id').isInt(),
    body('notes').trim().escape(),
    body('motto').trim().escape(),
    body('logo_path').optional().trim().escape()
  ];

  if (method === 'createTeam') {
    rules.push(body('name').custom(async (value) => {
      return await Team.checkDuplicateName(value);
    }));
  }

  return rules;
};

exports.create = async (req, res) => {
  const validationError = handleValidationErrors(req, res);
  if (validationError) return;

  try {
    const result = await Team.create(req.body);
    handleResponse(res, result, "Team created successfully.");
  } catch (err) {
    handleError(res, err);
  }
};

exports.findAll = async (req, res) => {
  try {
    const { sortCol, sortDir, limit, offset, filterCol, filterStr } = req.query;
    const result = await Team.getAll(sortCol, sortDir, limit, offset, filterCol, filterStr);
    handleResponse(res, result);
  } catch (err) {
    handleError(res, err);
  }
};

exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    
    if (!id) {
      return res.status(400).send({
        message: "Team ID is required",
        data: null
      });
    }
    const result = await Team.findById(id);
    
    if (!result || result.length === 0) {
      return res.status(404).send({
        message: `Team with id ${id} not found`,
        data: null
      });
    }

    res.send({
      message: "Team retrieved",
      data: result[0]
    });

  } catch (err) {
    res.status(500).send({
      message: err.message || "Error retrieving team",
      data: null
    });
  }
};

exports.update = async (req, res) => {
  try {

    const id = req.params.id;
    if (!id) {
      return res.status(400).send({
        message: "Team ID is required",
        data: null
      });
    }


    const team = await Team.findById(id);
    if (!team || team.length === 0) {
      return res.status(404).send({
        message: `Team with id ${id} not found`,
        data: null
      });
    }

    const result = await Team.updateById(id, req.body);
    
    if (result.affectedRows === 0) {
      return res.status(404).send({
        message: `Team with id ${id} not found`,
        data: null
      });
    }
    const updatedTeam = await Team.findById(id);
    
    res.send({
      message: "Team updated",
      data: updatedTeam[0]
    });
    
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error updating team",
      data: null
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    
    if (!id) {
      return res.status(400).send({
        message: "Team ID is required",
        data: null
      });
    }

    const result = await Team.remove(id);
    
    if (result.affectedRows === 0) {
      return res.status(404).send({
        message: `Team with id ${id} not found`,
        data: null
      });
    }

    res.send({
      message: "Team deleted",
      data: { id: id }
    });
    
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error deleting team",
      data: null
    });
  }
};