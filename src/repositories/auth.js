let UserModel = require('../models/users');

async function GetByID(ID) {
    let content = await UserModel.findOne({
        where: {
            ID: ID,
            IsActive: 1,
            IsVerified: 1
        }
    });
    return content;
}

async function GetByEmail(Email) {
    let content = await UserModel.findOne({
        where: {
            Email: Email,
            IsActive: 1,
            IsVerified: 1
        }
    });
    return content;
}

async function Create(User) {
    let content = await UserModel.create({
        UserName: User.UserName,
        Email: User.Email,
        Password: User.Password,
        Created_Date: User.CurrentDate,
        IsActive: 1,
        IsVerified: 1
    });
    return content;
}

async function Update(UpdateObject) {
    let content = await UpdateObject.update({
        UserName: UpdateObject.UserName,
        Email: UpdateObject.Email,
        Password: UpdateObject.Password,
        LastLoggedIn: UpdateObject.LastLoggedIn,
        IsLoggedIn: UpdateObject.IsLoggedIn,
        Token: UpdateObject.Token,
    });
    return content;
}

async function Logout(UpdateObject) {
    let content = await UpdateObject.updateAttributes({
        IsLoggedIn: false,
    });
    return content;
}

module.exports = {
    GetByID,
    GetByEmail,
    Create,
    Update,
    Logout
};