const sql = require("./db.js");

const League = function(league) {
  this.name = league.name;
  this.description = league.description;
};

League.create = async (newLeague) => {
  return await sql.query("INSERT INTO leagues SET ?", newLeague);
};

League.findById = async (id) => {
  return await sql.query("SELECT * FROM leagues WHERE id = ?", [id]);
};

League.getAll = async (sortCol = 'id', sortDir = 'ASC', limit = 30, offset = 0, filterCol = '', filterStr = '') => {
  let query = "SELECT * FROM leagues";
  
  if (filterCol && filterStr) {
    query += ` WHERE ${filterCol} LIKE '%${filterStr}%'`;
  }
  
  query += ` ORDER BY ${sortCol} ${sortDir} LIMIT ${limit} OFFSET ${offset}`;
  return await sql.query(query);
};

League.updateById = async (id, league) => {
  return await sql.query(
    "UPDATE leagues SET ? WHERE id = ?",
    [league, id]
  );
};

League.remove = async (id) => {
  return await sql.query("DELETE FROM leagues WHERE id = ?", [id]);
};

League.checkDuplicateName = async (name) => {
  const result = await sql.query("SELECT COUNT(*) as count FROM leagues WHERE name = ?", [name]);
  if (result[0].count > 0) {
    throw new Error('League name already exists');
  }
  return true;
};

module.exports = League;
