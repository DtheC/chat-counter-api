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
    const added = await sequelize.models.Count.findOne({
      where: {
        name: name
      }
    });
    if (added === null) {
      res.json({message: `Error: no counter with name ${name} exists`});
      return;
    }
    await added.increment('amount');
    await added.reload();
    res.json({message: added.getAddition()});
  } catch (err) {
    res.json({message: 'Error :('});
  }
});

module.exports = router;
