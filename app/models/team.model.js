const sql = require("./db.js");

const Team = function(team) {
  this.name = team.name;
  this.coach_id = team.coach_id;
  this.league_id = team.league_id;
  this.notes = team.notes;
  this.motto = team.motto;
  this.logo_path = team.logo_path;
};

Team.create = async (newTeam) => {
  return await sql.query("INSERT INTO teams SET ?", newTeam);
};

Team.findById = async (id) => {
  const query = `
    SELECT t.*, 
           p.first_name as coach_first_name, 
           p.last_name as coach_last_name,
           l.name as league_name
    FROM teams t
    LEFT JOIN people p ON t.coach_id = p.id
    LEFT JOIN leagues l ON t.league_id = l.id
    WHERE t.id = ?`;
    
  return await sql.query(query, [id]);
};

Team.getAll = async (sortCol = 'id', sortDir = 'ASC', limit = 10, offset = 0, filterCol = '', filterStr = '') => {
  let query = "SELECT * FROM teams";
  
  if (filterCol && filterStr) {
    query += ` WHERE ${filterCol} LIKE '%${filterStr}%'`;
  }
  
  query += ` ORDER BY ${sortCol} ${sortDir} LIMIT ${limit} OFFSET ${offset}`;
  return await sql.query(query);
};

Team.updateById = async (id, team) => {
  const query = `
    UPDATE teams 
    SET name = ?, 
        coach_id = ?, 
        league_id = ?, 
        notes = ?, 
        motto = ?, 
        logo_path = ?
    WHERE id = ?`;

  const values = [
    team.name,
    team.coach_id,
    team.league_id,
    team.notes || '',
    team.motto || '',
    team.logo_path,
    id
  ];
  
  return await sql.query(query, values);
};

Team.remove = async (id) => {
  const query = "DELETE FROM teams WHERE id = ?";
  return await sql.query(query, [id]);
};

Team.checkDuplicateName = async (name) => {
  const result = await sql.query("SELECT COUNT(*) as count FROM teams WHERE name = ?", [name]);
  if (result[0].count > 0) {
    throw new Error('Team name already exists');
  }
  return true;
};

module.exports = Team;