var express = require('express');
var router = express.Router();
const sequelize = require('../sequelize');

router.get('/', async function(req, res, next) {
  try {
    const counts = await sequelize.models.Count.findAll({
      where: {
        showInStats: true
      }
    });
    res.json({
      message: counts.map(x => x.getStat()).join(' ')
    });
  } catch (err) {
    res.json({message: 'Error connecting to database or table'});
  }
});

module.exports = router;
