var express = require('express');
var router = express.Router();
const sequelize = require('../sequelize');

const getStatsPreview = (counts) => {
  return counts.map(x => x.getStat()).join(' ');
}

/* GET home page. */
router.get('/', async function(req, res, next) {
  sequelize.models.Count.findAll().then(counts => {
    res.render('index', { title: 'Super Duper Counter API', counts, windowUrl: req.get('host'), statsPreview: getStatsPreview(counts)});
  });
});

module.exports = router;
