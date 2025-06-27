const person = require("../controllers/person.controller.js");

module.exports = app => {

  app.post("/coaches", person.validate('createPerson'), async (req, res) => {
    req.body.person_type = 'coach';
    await person.create(req, res);
  });

//all coaches
  app.get("/coaches", async (req, res) => {
    req.query.person_type = 'coach';
    await person.findAll(req, res);
  });


  app.get("/coaches/:id", async (req, res) => {
    req.query.person_type = 'coach';
    await person.findOne(req, res);
  });


  app.put("/coaches/:id", person.validate('updatePerson'), async (req, res) => {
    req.body.person_type = 'coach';
    await person.update(req, res);
  });

  app.delete("/coaches/:id", async (req, res) => {
    req.query.person_type = 'coach';
    await person.delete(req, res);
  });
};