const UserModel = require('../models/users');

async function GetByID(ID) {
    await UserModel.sync();
    let content = await UserModel.findOne({
        where: {
            ID: ID,
            IsActive: true
        }
    });
    return content;
}

async function Get() {
    await UserModel.sync();
    let content = await UserModel.findAll({
        attributes: [
            'ID',
            'Email',
            'UserName',
            'IsLoggedIn',
            'IsVerified',
            'RoleID'
        ]
    });
    return content;
}

async function Add(User) {
    let content = UserModel.create({
        Name: User.Username,
        Number: User.Number,
        Fees: User.Fees,
        Age: User.Age,
        CreatedDate: User.CreatedDate,
        IsActive: true,
        CreatedBy: User.CreatedBy,
    });
    return content;
}

async function Update(UpdateObject, User) {
    let content = await UpdateObject.updateAttributes({
        Name: User.Username,
        Number: User.Number,
        Fees: User.Fees,
        Age: User.Age,
        UpdateDate: User.UpdateDate,
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