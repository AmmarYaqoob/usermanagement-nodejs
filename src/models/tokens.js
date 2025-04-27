const Sequelize = require('sequelize');
const { sequelize } = require('../connection/connectionstring');

var Tokens = sequelize.define('tokens', {
    ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Token: {
        type: Sequelize.STRING
    },
    UserID: {
        type: Sequelize.INTEGER
    },
    ExpiryDate: {
        type: Sequelize.DATE
    },
    CreatedDate: {
        type: Sequelize.DATE
    }
}, {
    freezeTableName: true,
    timestamps: false,
});

module.exports = Tokens;