var express = require('express');
var router = express.Router();
const sequelize = require('../sequelize');

const getStatsPreview = (counts) => {
  return counts.filter(x => x.showInStats).sort((x, y) => x.orderInStats - y.orderInStats).map(x => x.getStat()).join(' ');
}

/* GET home page. */
router.get('/', async function(req, res, next) {
  sequelize.models.Count.findAll().then(counts => {
    counts.sort((a, b) => {
      const i = a.orderInStats - b.orderInStats;
      if (i !== 0) return i;
      return a.name.localeCompare(b.name);
    });
    res.render('index', { title: 'Super Duper Counter API', counts, windowUrl: req.get('host'), statsPreview: getStatsPreview(counts)});
  });
});

module.exports = router;
