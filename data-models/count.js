const { DataTypes, Model } = require('sequelize');
const sequelize = require('../sequelize');

class Count extends Model {
  getStat() {
    return this.message.replace('{0}', this.amount);
  }

  getAddition() {
    return this.addition.replace('{0}', this.amount);
  }
}

Count.init({
  // Model attributes are defined here
  name: {
    type: DataTypes.TEXT,
    primaryKey: true
  },
  amount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  message: {
    type: DataTypes.TEXT,
    defaultValue: 'Done it {0} times.'
  },
  addition: {
    type: DataTypes.TEXT,
    defaultValue: 'Added a new one so now it\'s been done {0} times.'
  }
}, {
  sequelize,
  modelName: 'Count'
});

(async () => {
  await sequelize.sync();
  Count.create({name: 'chatDamage', message: 'Taken damage due to chat at least {0} times.', addition: 'Imagine looking at chat {0} times and taking damage. Imagine being that person.'});
  Count.create({name: 'promisesKept', message: 'Kept at least {0} promises made to chat.', addition: 'Niko has kept a promise he made to chat {0} times. I guess we can\'t be disappointed in him today.'});
  Count.create({name: 'promisesBroken', message: 'Broken {0} promises to chat.', addition: 'Niko has broken a promise he made to chat {0} times. We\'re not mad, just disappointed.'});
})();

module.exports = Count;