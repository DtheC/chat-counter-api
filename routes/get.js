var express = require('express');
var router = express.Router();
const pool = require('../pool');

router.get('/', async function(req, res, next) {
  const name = req.query.name;
  if (!name) {
    res.json({message: "Error: no name parameter"});
    return;
  }
  try {
    const client = await pool.connect();
    const result = await client.query(`SELECT * FROM counts WHERE name='${name}'`);
    const o = result.rows[0];
    res.json({message: o.message.replace('{0}', o.amount)});
    client.release();
  } catch (err) {
    res.json({message: 'Error :('});
  }
});

module.exports = router;
