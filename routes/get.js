var express = require('express');
var router = express.Router();
const sequelize = require('../sequelize');

router.get('/', async function(req, res, next) {
  const name = req.query.name;
  if (!name) {
    res.json({message: "Error: no name parameter"});
    return;
  }
  try {
    const requestedCount = await sequelize.models.Count.findOne({
      where: {
        name: name
      }
    });
    if (requestedCount === null) {
      res.json({message: `Error: no counter with name ${name} exists`});
      return;
    }
    res.json({message: requestedCount.getStat()});
  } catch (err) {
    res.json({message: 'Error :('});
  }
});

module.exports = router;
