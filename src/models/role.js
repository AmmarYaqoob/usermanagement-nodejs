const Sequelize = require('sequelize');
const { sequelize } = require('../connection/connectionstring');

var Role = sequelize.define('role', {
    ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Name: {
        type: Sequelize.STRING
    },
    Description: {
        type: Sequelize.STRING
    },
    IsActive: {
        type: Sequelize.BOOLEAN
    },
    CreatedBy: {
        type: Sequelize.INTEGER
    },
    CreatedDate: {
        type: Sequelize.DATE
    },
    UpdatedBy: {
        type: Sequelize.INTEGER
    },
    UpdatedDate: {
        type: Sequelize.DATE
    },
    DeletedBy: {
        type: Sequelize.INTEGER
    },
    DeletedDate: {
        type: Sequelize.DATE
    }
}, {
    freezeTableName: true,
    timestamps: false,
});

module.exports = Role;