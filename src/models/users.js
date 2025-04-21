const Sequelize = require('sequelize');
const Role = require('./role');
const { sequelize } = require('../connection/connectionstring');

var User = sequelize.define('users', {
    ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Email: {
        type: Sequelize.STRING
    },
    UserName: {
        type: Sequelize.STRING
    },
    ProfilePicture: {
        type: Sequelize.STRING
    },
    ProfilePictureThumbnail: {
        type: Sequelize.STRING
    },
    Address: {
        type: Sequelize.STRING
    },
    City: {
        type: Sequelize.STRING
    },
    State: {
        type: Sequelize.STRING
    },
    Country: {
        type: Sequelize.STRING
    },
    Phone: {
        type: Sequelize.INTEGER
    },
    IsLoggedIn: {
        type: Sequelize.BOOLEAN
    },
    Password: {
        type: Sequelize.STRING
    },
    RoleID: {
        type: Sequelize.INTEGER,
        references: {
            model: Role,
            key: "ID"
        },
        onDelete: "RESTRICT",
        onUpdate: "CASCADE"
    },
    IsActive: {
        type: Sequelize.BOOLEAN
    },
    IsVerified: {
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
    Token: {
        type: Sequelize.TEXT
    }
}, {
    freezeTableName: true,
    timestamps: false,
});

module.exports = User;