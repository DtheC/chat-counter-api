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
    await client.query(`UPDATE counts SET amount = amount + 1 WHERE name = '${name}'`);
    const updated = await client.query(`SELECT * FROM counts WHERE name='${name}'`);
    const o = updated.rows[0];
    res.json({message: o.addition.replace('{0}', o.amount)});
    client.release();
  } catch (err) {
    res.json({message: 'Error :('});
  }
});

module.exports = router;
