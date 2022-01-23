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
  Count.create({name: 'chatDamage'});
  Count.create({name: 'promisesKept'});
})();

module.exports = Count;