var express = require('express');
var router = express.Router();
const pool = require('../pool');

router.get('/', async function(req, res, next) {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM counts');
    res.json(result.rows);
    client.release();
  } catch (err) {
    res.json({message: 'Error :('});
  }
});

module.exports = router;
