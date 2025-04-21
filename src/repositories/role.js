let Roles = require('../models/role');

async function GetByID(ID) {
    await Roles.sync({});
    let content = await Roles.findOne({
        where: {
            ID: ID,
            IsActive: true
        },
        attributes: [
            "ID",
            "Name",
            "Description",
            "IsActive",
        ]
    });
    return content;
}

async function Get() {
    await Roles.sync({});
    let content = await Roles.findAll({
        where: {
            IsActive: true
        },
        attributes: [
            "ID",
            "Name",
            "Description",
            "IsActive",
        ]
    });
    return content;
}

async function Add(User) {
    await Roles.sync({});
    let content = Roles.create({
        Name: User.Name,
        Description: User.Description,
        CreatedDate: User.CreatedDate,
        IsActive: true,
        CreatedBy: User.CreatedBy
    });
    return content;
}

async function Update(UpdateObject, User) {
    let content = await UpdateObject.updateAttributes({
        Name: User.Name,
        Description: User.Description,
        UpdateDate: User.UpdateDate,
        UpdatedBy: User.UpdatedBy
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