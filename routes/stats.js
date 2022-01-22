var express = require('express');
var router = express.Router();

const {Pool} = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const constructLines = (resultsArray) => {
  return resultsArray.map(x => x.message.replace('{0}', x.amount)).join(' ');
}

/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM counts');
    
    const m = {
      message: constructLines(result.rows)
    };

    res.json(m);
    // res.render('pages/db', results );
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
  // res.json({"chatDamage": 10, "promisesBroken": 2, "promisesKept": 0});
});

module.exports = router;
