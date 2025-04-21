const moment = require('moment');
const RoleRepo = require('../repositories/role');
const { ResponseObj } = require('../utils/responsewrapper');

async function GetByID(ID) {
    let objRes = new ResponseObj;
    let result = await RoleRepo.GetByID(ID);
    if (result) {
        objRes.Message = 'Role!';
        objRes.Data = result;
        return objRes;
    }
    objRes.IsSuccess = false;
    objRes.Message = 'No data found';
    return objRes;
}

async function Get() {
    let objRes = new ResponseObj;
    let result = await RoleRepo.Get();
    if (result) {
        objRes.Message = 'Roles!';
        objRes.Data = result;
        return objRes;
    }
    objRes.IsSuccess = false;
    objRes.Message = 'No data found';
    return objRes;
}

async function Add(Role) {
    let objRes = new ResponseObj;
    let currentTime = moment().format("YYYY-MM-DDTHH:mm:ss");
    Role.CreatedDate = currentTime;
    let result = await RoleRepo.Add(Role);
    if (result) {
        objRes.Message = 'Created';
        objRes.Data = result;
        return objRes;
    }
    objRes.IsSuccess = false;
    objRes.Message = 'Error on creation';
    return objRes;
}

async function Update(Role) {
    let objRes = new ResponseObj;
    let currentTime = moment().format("YYYY-MM-DDTHH:mm:ss");
    Role.UpdateDate = currentTime;
    let result = await RoleRepo.GetByID(Role.ID);
    if (!result) {
        objRes.IsSuccess = false;
        objRes.Message = 'Error on update';
        return objRes;
    }
    let updateResult = await RoleRepo.Update(result, Role);
    if (!updateResult) {
        objRes.IsSuccess = false;
        objRes.Message = 'Error on Updation';
        return objRes;
    }
    objRes.Message = 'Updated!';
    objRes.Data = result;
    return objRes;
}

async function Delete(ID) {
    let objRes = new ResponseObj;
    let result = await RoleRepo.GetByID(ID);
    if (result) {
        let deleteResult = await RoleRepo.Delete(result);
        if (deleteResult) {
            objRes.Message = 'Deleted';
            return objRes;
        }
    }
    objRes.IsSuccess = false;
    objRes.Message = 'No Data';
    return objRes;
}

module.exports = {
    GetByID,
    Get,
    Add,
    Update,
    Delete,
};