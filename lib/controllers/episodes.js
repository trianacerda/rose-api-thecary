const { Router } = require('express');
const { Episode } = require('../models/Episode');

module.exports = Router().get('/', async (req, res, next) => {
  const episodes = await Episode.getAll();
  res.json(episodes);
});
