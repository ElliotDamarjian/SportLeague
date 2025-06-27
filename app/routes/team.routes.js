const teams = require("../controllers/team.controller.js");

module.exports = app => {

  app.post("/teams", teams.validate('createTeam'), teams.create);

  app.get("/teams", teams.findAll);

  app.get("/teams/:id", teams.findOne);

  app.put("/teams/:id", teams.validate('updateTeam'), teams.update);

  app.delete("/teams/:id", teams.delete);
};