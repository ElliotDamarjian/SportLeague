const league = require("../controllers/leagues.controller.js");

module.exports = app => {

  app.post("/leagues", league.validate('createLeague'), async (req, res) => {
    await league.create(req, res);
  });

  app.get("/leagues", async (req, res) => {
    await league.findAll(req, res);
  });

  app.get("/leagues/:id", async (req, res) => {
    await league.findOne(req, res);
  });

  app.put("/leagues/:id", league.validate('updateLeague'), async (req, res) => {
    await league.update(req, res);
  });

  app.delete("/leagues/:id", async (req, res) => {
    await league.delete(req, res);
  });
};
