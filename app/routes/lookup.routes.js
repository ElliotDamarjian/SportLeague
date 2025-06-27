const Lookups = require("../models/lookups.model.js");

module.exports = app => {
  app.get("/lookups/:lookupTable", async (req, res) => {
    try {
      let result;
      switch(req.params.lookupTable) {
        case 'coaches':
          result = await Lookups.getCoaches();
          break;
        case 'teams':
          result = await Lookups.getTeams();
          break;
        case 'leagues':
          result = await Lookups.getLeagues();
          break;
          //for future maybe
        case 'licenses':
          result = await Lookups.getLicenses();
          break;
        default:
          throw new Error('Invalid lookup table');
      }
      res.send(result);
    } catch(err) {
      res.status(500).send({
        message: err.message || "An error occurred while retrieving lookup data."
      });
    }
  });
};