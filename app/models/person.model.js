const sql = require("./db.js");

const Person = function(person) {
  this.first_name = person.first_name;
  this.last_name = person.last_name;
  this.address1 = person.address1;
  this.address2 = person.address2;
  this.notes = person.notes;
  this.city = person.city;
  this.state = person.state;
  this.zip = person.zip;
  this.team_id = person.team_id;
  this.email = person.email;
  this.phone = person.phone;
  this.password = person.password;
  this.user_name = person.user_name;
  this.license_level_id = person.license_level_id;
  this.person_type = person.person_type;
  this.logo_path = person.logo_path;
};

Person.create = async (newPerson) => {
  return await sql.query("INSERT INTO people SET ?", newPerson);
};

Person.findById = async (id) => {
  return await sql.query("SELECT * FROM people WHERE id = ?", [id]);
};

//have limit to 30 for now can adjust if want more
Person.getAll = async (sortCol = 'id', sortDir = 'ASC', limit = 30, offset = 0, filterCol = '', filterStr = '', person_type = '') => {
  let query = "SELECT * FROM people";
  let conditions = [];
  
  if (person_type) {
    conditions.push(`person_type = '${person_type}'`);
  }
  
  if (filterCol && filterStr) {
    conditions.push(`${filterCol} LIKE '%${filterStr}%'`);
  }
  
  if (conditions.length > 0) {
    query += " WHERE " + conditions.join(" AND ");
  }
  
  query += ` ORDER BY ${sortCol} ${sortDir} LIMIT ${limit} OFFSET ${offset}`;
  return await sql.query(query);
};


Person.updateById = async (id, person) => {
  return await sql.query(
    "UPDATE people SET ? WHERE id = ?",
    [person, id]
  );
};

Person.remove = async (id) => {
  return await sql.query("DELETE FROM people WHERE id = ?", [id]);
};

Person.checkDuplicateEmail = async (email) => {
  const result = await sql.query("SELECT COUNT(*) as count FROM people WHERE email = ?", [email]);
  if (result[0].count > 0) {
    throw new Error('Error entered duplicate emails');
  }
  return true;
};

module.exports = Person;