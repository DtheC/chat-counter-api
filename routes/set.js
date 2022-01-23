const e = require('express');
var express = require('express');
var router = express.Router();
const sequelize = require('../sequelize');

router.post('/', async function(req, res, next) {
  console.log(req.body);
  const apiKey = req.body.apiKey;
  // if (apiKey !== process.env.API_KEY) {
  //   res.json({message: 'API key missing or incorrect'});
  //   return;
  // }
  const {name, amount, message, addition, action} = req.body;
  if (!name) {
    res.json({message: "Error: no name parameter"});
    return;
  }
  if (!action) {
    res.json({message: "Error: no name action defined"});
  }
  try {
    if (action === 'delete') {
      await sequelize.models.Count.destroy({
        where: {
          name: name
        }
      });
    } else {
      await sequelize.models.Count.update({name, amount, message, addition}, {
        where: {
          name: name
        }
      });
    }
    res.redirect('/');
    // if (added === null) {
    //   res.json({message: `Error: no counter with name ${name} exists`});
    //   return;
    // }
    // await added.increment('amount');
    // await added.reload();
    // res.json({message: added.getAddition()});
  } catch (err) {
    res.redirect('/');
    // res.json({message: 'Error :('});
  }
});

module.exports = router;
