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
        type: Sequelize.TEXT
    },
    UserName: {
        type: Sequelize.TEXT
    },
    ProfilePicture: {
        type: Sequelize.TEXT
    },
    ProfilePictureThumbnail: {
        type: Sequelize.TEXT
    },
    Address: {
        type: Sequelize.TEXT
    },
    City: {
        type: Sequelize.TEXT
    },
    State: {
        type: Sequelize.TEXT
    },
    Country: {
        type: Sequelize.TEXT
    },
    Phone: {
        type: Sequelize.INTEGER
    },
    IsLoggedIn: {
        type: Sequelize.BOOLEAN
    },
    Password: {
        type: Sequelize.TEXT
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