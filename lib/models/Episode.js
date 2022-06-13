const pool = require('../utils/pool');
const { Quote } = require('./Quote');

class Episode {
  id;
  title;
  season;
  number;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.number = row.number;
    this.season = row.season;
    this.quotes =
      row.quotes.length > 0 ? row.quotes.map((quote) => new Quote(quote)) : [];
  }

  static async getAll() {
    const { rows } = await pool.query(
      `
      SELECT episodes.*,
      COALESCE (
        json_agg(to_jsonb(quotes))
        FILTER (WHERE quotes.id is NOT NULL), '[]'
        ) as quotes 
        FROM episodes 
        INNER JOIN quotes ON episodes.id = episode_id 
        GROUP BY episodes.id
      `
    );
    const row = rows.map((row) => new Episode(row));
    return row;
  }
}

module.exports = { Episode };
