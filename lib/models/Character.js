const pool = require('../utils/pool');
const { Quote } = require('./Quote');

class Character {
  id;
  first_name;
  last_name;
  quotes;

  constructor(row) {
    this.id = row.id;
    this.first_name = row.first_name;
    this.last_name = row.last_name;
    this.quotes =
      row.quotes.length > 0 ? row.quotes.map((quote) => new Quote(quote)) : [];
  }

  static async getAll() {
    const { rows } = await pool.query(`
    SELECT characters.*,
    COALESCE  (
      json_agg(to_jsonb(quotes))
      FILTER (WHERE quotes.id is NOT NULL), '[]'
      ) as quotes 
      FROM characters 
      LEFT JOIN quotes ON characters.id = character_id 
      GROUP BY characters.id
    `);
    console.log('rows', rows);
    const row = rows.map((row) => new Character(row));
    console.log('row', row);
    return row;
  }
}

module.exports = Character;
