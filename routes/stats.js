var express = require('express');
var router = express.Router();

const pool = require('../pool');

const constructLines = (resultsArray) => {
  return resultsArray.map(x => x.message.replace('{0}', x.amount)).join(' ');
}

router.get('/', async function(req, res, next) {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM counts');
    const m = {
      message: constructLines(result.rows)
    };
    res.json(m);
    client.release();
  } catch (err) {
    res.json({message: 'Error :('});
  }
});

module.exports = router;
