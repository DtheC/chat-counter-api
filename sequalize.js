const { Sequelize} = require("sequelize");

if(process.env.NODE_ENV == "production") {
  module.exports = new Sequelize("process.env.DATABASE_URL");
} else {
  console.log('dev')
  module.exports = new Sequelize('sqlite::memory:');
}
