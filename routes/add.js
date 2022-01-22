var express = require('express');
var router = express.Router();

const {Pool} = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

/* GET home page. */
router.post('/', async function(req, res, next) {
  const name = req.body.name;
  if (!name) {
    res.send("Error: no name parameter");
    return;
  }
  try {
    const client = await pool.connect();
    const result = await client.query(`SELECT * FROM counts WHERE name='${name}'`);
    // const results = { 'results': (result) ? result.rows : null};
    res.json(result.rows);
    // res.render('pages/db', results );
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
  // res.json({"chatDamage": 10, "promisesBroken": 2, "promisesKept": 0});
});

module.exports = router;
