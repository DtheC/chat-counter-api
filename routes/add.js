var express = require('express');
var router = express.Router();

const {Pool} = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

router.get('/', async function(req, res, next) {
  const name = req.query.name;
  if (!name) {
    res.send("Error: no name parameter");
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
    console.error(err);
    res.send("Error " + err);
  }
});

module.exports = router;
