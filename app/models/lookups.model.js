const sql = require("./db.js");

const Lookups = {
  getCoaches: async () => {
    return await sql.query(
      "SELECT CONCAT(first_name, ' ', last_name) as label, id as value FROM people WHERE person_type='coach'"
    );
  },

  getTeams: async () => {
    return await sql.query("SELECT name as label, id as value FROM teams");
  },
  //not implemented yet
  getLeagues: async () => {
    return await sql.query("SELECT name as label, id as value FROM leagues");
  },
  //not implemented yet
  getLicenses: async () => {
    return await sql.query("SELECT value as label, id as value FROM license_levels");
  }
};

module.exports = Lookups;