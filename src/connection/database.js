const { sequelize } = require('./connectionstring');

function BootstrapDatabase() {
  return new Promise((resolve, reject) => {
    sequelize
      .authenticate()
      .then(() => {
        return resolve(true);
      })
      .catch(err => {
        console.error('Unable to connect to the database:', err);
        return resolve(false);
      });
    sequelize.sync({ force: false, alter: false })
  });
}

module.exports = { BootstrapDatabase }