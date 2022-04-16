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
    counts.sort((a, b) => {
      const i = a.orderInStats - b.orderInStats;
      if (i !== 0) return i;
      return a.name.localeCompare(b.name);
    });
    res.json({
      message: counts.map(x => x.getStat()).join(' ')
    });
  } catch (err) {
    res.json({message: 'Error connecting to database or table'});
  }
});

module.exports = router;
