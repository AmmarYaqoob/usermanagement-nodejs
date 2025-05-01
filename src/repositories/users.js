const Sequelize = require('sequelize');
const UserModel = require('../models/users');
const Op = Sequelize.Op;

async function GetByID(ID) {
    await UserModel.sync();
    let content = await UserModel.findOne({
        where: {
            ID: ID,
            IsActive: true
        },
        attributes: [
            'ID',
            'Email',
            'UserName',
        ]
    });
    return content;
}

async function Get() {
    await UserModel.sync();
    let content = await UserModel.findAll({
        where: {
            IsActive: true,
            RoleID: { [Op.notIn]: [1] }
        },
        attributes: [
            'ID',
            'Email',
            'UserName',
            'IsLoggedIn',
            'IsVerified',
            'RoleID',
            'CreatedDate'
        ],
        raw: true
    });
    return content;
}

async function Add(User) {
    let content = UserModel.create({
        UserName: User.UserName,
        Email: User.Email,
        Password: User.Password,
        RoleID: User.RoleID,
        CreatedDate: User.CreatedDate,
        IsActive: User.IsActive,
        IsLoggedIn: User.IsLoggedIn,
        CreatedBy: User.CreatedBy
    });
    return content;
}

async function Update(UpdateObject) {
    let content = await UpdateObject.update({
        UserName: UpdateObject.UserName,
        Email: UpdateObject.Email,
    });
    return content;
}

async function Delete(UpdateObject) {
    let content = await UpdateObject.updateAttributes({
        IsActive: false,
    });
    return content;
}

module.exports = {
    GetByID,
    Get,
    Add,
    Update,
    Delete,
};