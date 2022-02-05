const e = require('express');
var express = require('express');
var router = express.Router();
const sequelize = require('../sequelize');

router.post('/', async function(req, res, next) {
  const apiKey = req.body.apiKey;
  if (apiKey !== process.env.API_KEY) {
    res.json({message: 'API key missing or incorrect'});
    return;
  }
  const {name, amount, message, addition, action} = req.body;
  // As the value of a checkbox is 'on' if ticked or just not send in the form body at all if unticked
  // we use a !! to confirm  what value the showInStats field should be.
  const showInStats = !!req.body.showInStats;

  if (!name) {
    res.json({message: "Error: no name parameter"});
    return;
  }
  if (!action) {
    res.json({message: "Error: no action defined"});
  }
  try {
    if (action === 'delete') {
      await sequelize.models.Count.destroy({
        where: {
          name: name
        }
      });
    } else if(action === 'create') {
      await sequelize.models.Count.create({name, amount, message, addition, showInStats});
    } else {
      await sequelize.models.Count.update({name, amount, message, addition, showInStats}, {
        where: {
          name: name
        }
      });
    }
    res.redirect('/');
  } catch (err) {
    res.redirect('/');
  }
});

module.exports = router;
