const person = require("../controllers/person.controller.js");

module.exports = app => {
  app.get("/players", async (req, res) => {
    req.query.person_type = 'player';
    await person.findAll(req, res);
  });

  app.post("/players", person.validate('createPerson'), async (req, res) => {
    req.body.person_type = 'player';
    await person.create(req, res);
  });


  app.get("/players", async (req, res) => {
    req.query.person_type = 'player';
    await person.findAll(req, res);
  });


  app.get("/players/:id", async (req, res) => {
    req.query.person_type = 'player';
    await person.findOne(req, res);
  });

  app.put("/players/:id", person.validate('updatePerson'), async (req, res) => {
    req.body.person_type = 'player';
    await person.update(req, res);
  });


  app.delete("/players/:id", async (req, res) => {
    req.query.person_type = 'player';
    await person.delete(req, res);
  });
};