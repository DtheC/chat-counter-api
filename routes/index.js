var express = require('express');
var router = express.Router();
const sequelize = require('../sequelize');

const getStatsPreview = (counts) => {
  return counts.filter(x => x.showInStats).map(x => x.getStat()).join(' ');
}

/* GET home page. */
router.get('/', async function(req, res, next) {
  sequelize.models.Count.findAll().then(counts => {
    counts = counts.sort((a, b) => {
      if (!a.name || !b.name) return 0;
      return a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 1;
    });
    res.render('index', { title: 'Super Duper Counter API', counts, windowUrl: req.get('host'), statsPreview: getStatsPreview(counts)});
  });
});

module.exports = router;
