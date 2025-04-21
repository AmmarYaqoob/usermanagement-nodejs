const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DB_USER,
  process.env.DB_PASS, {
  host: process.env.HOST,
  dialect: process.env.DIALECT || 'mysql',
  logging: false,
  pool: {
      max: 500,
      min: 0,
      acquire: 1000000,
      idle: 10000,
      evict: 10000
  }
});

module.exports = { sequelize }
