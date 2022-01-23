var express = require('express');
var router = express.Router();
const sequelize = require('../sequelize');
const pool = require('../pool');

router.get('/', async function(req, res, next) {
  const counts = await sequelize.models.Count.findAll();
  res.json(counts);
  // try {
  //   const client = await pool.connect();
  //   const result = await client.query('SELECT * FROM counts');
  //   res.json(result.rows);
  //   client.release();
  // } catch (err) {
  //   res.json({message: 'Error :('});
  // }
});

module.exports = router;
