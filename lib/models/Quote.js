const pool = require('../utils/pool');

class Quote {
  id;
  detail;
  character_id;
  constructor(row) {
    this.id = row.id;
    this.detail = row.detail;
    this.character_id = row.character_id;
  }

  static async count() {
    const { rows } = await pool.query('SELECT COUNT(*) FROM quotes');
    return Number(rows[0].count);
  }

  static async insert({ character_id, detail }) {
    const { rows } = await pool.query(
      'INSERT INTO quotes (character_id, detail) VALUES ($1, $2) RETURNING *',
      [character_id, detail]
    );
    return new Quote(rows[0]);
  }
}

module.exports = { Quote };
