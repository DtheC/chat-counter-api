const { Sequelize } = require("sequelize");

if (process.env.NODE_ENV == "production") {
  module.exports = new Sequelize(process.env.DATABASE_URL + "?sslmode=no-verify", {
    ssl: {
      require: true,
      rejectUnauthorized: false // <<<<<<< YOU NEED THIS
    }
  });
} else {
  module.exports = new Sequelize('sqlite::memory:');
}